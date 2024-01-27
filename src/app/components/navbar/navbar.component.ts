import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(public navigationService: NavigationService) {}
}
