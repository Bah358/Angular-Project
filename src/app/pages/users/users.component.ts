import { Component, OnInit } from '@angular/core';
import { user } from '../../services/Classes';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: user[] = [];
  constructor(public connection: ConnectionService) {}
  ngOnInit(): void {
    this.connection.loading = true;
    this.connection.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.connection.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
