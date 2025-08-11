import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
      this.getUser();
    });
  }

  async getUser() {
    if (!this.userId) return;
    const userDocRef = doc(this.firestore, `users/${this.userId}`);
    const userSnap = await getDoc(userDocRef);
    this.user = userSnap.exists() ? (userSnap.data() as User) : new User();
  }

  editAddressMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
    dialog.componentInstance.userId = this.userId;

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        // User wurde erfolgreich aktualisiert, lade die Daten neu
        this.getUser();
      }
    });
  }

  editUserMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    // dialog.componentInstance.user = this.user;
  }
}
