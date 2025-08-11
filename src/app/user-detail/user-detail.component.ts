import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
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
}
