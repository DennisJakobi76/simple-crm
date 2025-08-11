import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../models/user.class';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  dialogRef: MatDialogRef<DialogEditUserComponent> = inject(
    MatDialogRef<DialogEditUserComponent>
  );
  user: User = new User();
  userId: string = '';
  birthDate: Date = new Date();
  loading = false;

  ngOnInit() {
    // Wenn user.birthDate gesetzt ist, konvertiere es zu einem Date-Objekt
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  async saveUser(): Promise<void> {
    if (this.loading || !this.userId) return;

    this.loading = true;

    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      const userData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: this.birthDate.getTime(),
      };
      await updateDoc(userDocRef, userData);

      console.log('User updated successfully with ID:', this.userId);
      this.dialogRef.close(this.user);
    } catch (error) {
      console.error('Error updating user:', error);
      alert(
        'Fehler beim Aktualisieren des Benutzers. Bitte versuchen Sie es erneut.'
      );
    } finally {
      this.loading = false;
    }
  }
}
