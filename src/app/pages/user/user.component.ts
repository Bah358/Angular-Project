import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConnectionService } from '../../services/connection.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit, OnDestroy {
  queryParams: number = 0;
  private myVarSubscription: Subscription | null = null;
  private queryParamsSubscription: Subscription | null = null;

  constructor(
    public connection: ConnectionService,
    private router: Router,
    public navigation: NavigationService
  ) {}
  ngOnInit(): void {
    this.myVarSubscription = this.connection.search$.subscribe(() => {
      if (
        this.queryParams !== +this.connection.search &&
        +this.connection.search === this.connection.user.id &&
        this.connection.search !== ''
      ) {
        alert('search');
        this.getUser();
      }
    });
    this.subscribeToQueryParams();
  }

  private subscribeToQueryParams(): void {
    this.queryParamsSubscription =
      this.router.routerState.root.queryParams.subscribe((params) => {
        this.queryParams = +params['id'];
        this.getUser();
      });
  }

  getUser(): void {
    this.connection.getUser(this.queryParams).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.myVarSubscription) {
      this.myVarSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
