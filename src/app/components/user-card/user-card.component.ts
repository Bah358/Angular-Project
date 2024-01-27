import { Component, Input } from '@angular/core';
import { user } from '../../services/Classes';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  constructor(public navigationService: NavigationService) {}
  @Input() user!: user;
}
