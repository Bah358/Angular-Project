import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
import { NavigationService } from '../../services/navigation.service';
import { Subject, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnDestroy {
  public KeyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription | null = null;
  constructor(
    private router: Router,
    public connection: ConnectionService,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.KeyUp.pipe(
      map((event: any) => {
        return event?.target?.value.trim();
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value) => {
      if (!value) {
        // If the search string is empty, reset or perform other necessary actions
        this.rest();
        return;
      }

      this.connection.search = value;
      this.connection.updateMyVariable(value);
      this.router.navigate(['/user'], {
        queryParams: { id: value },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  rest(): void {
    this.connection.loading = false;
    this.navigation.navigateTo('/users');
    this.connection.search = '';
  }
}
