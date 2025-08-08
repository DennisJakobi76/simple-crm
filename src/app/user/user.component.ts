import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User = new User();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});
  }
}
import { User } from '../../models/user.class';
