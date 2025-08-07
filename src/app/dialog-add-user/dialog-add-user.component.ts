import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  imports: [MatDialogModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  cancel(): void {
    // Logic to handle cancel action
  }

  saveUser(): void {
    // Logic to handle saving the user
  }
}
