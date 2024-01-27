import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  constructor(
    public navigationService: NavigationService,
    public connection: ConnectionService
  ) {}

  arrayFrom(length: number): any[] {
    return Array.from({ length }, (_, i) => i);
  }

  getUsers(page: number): void {
    // Check if the users for the requested page are not loaded yet

    if (page < 1 || page > this.connection.total_pages) return;
    if (
      this.connection.users[page - 1] === undefined ||
      this.connection.users[page - 1].length === 0
    ) {
      this.connection.page = page;
      this.connection.getUsers().subscribe({
        next: (data) => {
          // Process the data as needed
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
    } else {
      // If users for the requested page are already loaded, just update the page
      this.connection.page = page;
    }
  }
}
