import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
    });
  }
}
