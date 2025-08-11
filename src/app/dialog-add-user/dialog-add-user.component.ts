import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  dialogRef: MatDialogRef<DialogAddUserComponent> = inject(
    MatDialogRef<DialogAddUserComponent>
  );

  user: User = new User();
  birthDate?: Date;
  loading = false;

  cancel(): void {
    this.dialogRef.close();
  }

  async saveUser(): Promise<void> {
    if (this.loading) return;

    this.loading = true;
    this.user.birthDate = this.birthDate?.getTime() || 0;

    try {
      const usersCollection = collection(this.firestore, 'users');
      const userData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        birthDate: this.user.birthDate,
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city,
        email: this.user.email,
      };
      const docRef = await addDoc(usersCollection, userData);

      console.log('User saved successfully with ID:', docRef.id);
      this.dialogRef.close(this.user);
    } catch (error) {
      console.error('Error saving user:', error);
      alert(
        'Fehler beim Speichern des Benutzers. Bitte versuchen Sie es erneut.'
      );
    } finally {
      this.loading = false;
    }
  }
}
