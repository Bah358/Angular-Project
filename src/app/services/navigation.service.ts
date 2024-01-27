import { Injectable } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navigation = [
    { path: '/', name: 'Home' },
    { path: '/users', name: 'Users' },
  ];

  path: string = window.location.pathname;
  openSidebar: boolean = false;

  navigateTo(path: string) {
    this.openSidebar = false;
    this.path = path;
    this.router.navigate([path]);
  }
  navigateToUser(path: string, id: number) {
    this.path = path;
    this.router.navigate([path], { queryParams: { id: id } });
  }

  constructor(private router: Router) {}
}
