import { Component, inject } from '@angular/core';
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
  selector: 'app-dialog-edit-address',
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
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  firestore: Firestore = inject(Firestore);
  dialogRef: MatDialogRef<DialogEditAddressComponent> = inject(
    MatDialogRef<DialogEditAddressComponent>
  );
  user: User = new User();
  userId: string = '';
  loading = false;

  cancel(): void {
    this.dialogRef.close(null);
  }

  async saveUser(): Promise<void> {
    if (this.loading || !this.userId) return;

    this.loading = true;

    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      const userData = {
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city,
      };
      await updateDoc(userDocRef, userData);

      console.log('User address updated successfully with ID:', this.userId);
      this.dialogRef.close(this.user);
    } catch (error) {
      console.error('Error updating user address:', error);
      alert(
        'Fehler beim Aktualisieren der Benutzeradresse. Bitte versuchen Sie es erneut.'
      );
    } finally {
      this.loading = false;
    }
  }
}
