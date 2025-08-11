import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
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
  loading = false;

  cancel(): void {
    this.dialogRef.close();
  }

  async saveUser(): Promise<void> {
    if (this.loading) return;

    this.loading = true;

    try {
      const usersCollection = collection(this.firestore, 'users');
      const userData = {
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city,
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
