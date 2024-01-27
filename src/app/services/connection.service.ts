import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { user } from './Classes';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}
  private myVariableSubject = new BehaviorSubject<string>('');
  search$ = this.myVariableSubject.asObservable();

  updateMyVariable(newVal: any) {
    this.myVariableSubject.next(newVal);
  }

  users: any[][] = [];
  page: number = 0;
  total_pages: number = 0;
  total_users: number = 0;

  loading: boolean = false;

  baseUrl: string = 'https://reqres.in/api/users';
  search: string = '';

  user: user = new user();

  getUsers(): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.baseUrl}?page=${this.page} `).pipe(
      map((data: any) => {
        this.loading = false;
        if (this.page == 0) {
          this.total_users = data.total;
          this.total_pages = data.total_pages;
        }
        this.page = data.page;
        this.users[this.page - 1] = data.data;

        return data['data'];
      }),
      catchError((error) => {
        alert('Error fetching users');

        throw error;
      })
    );
  }
  getUser(id: number): Observable<any> {
    if (id === 0 || id === undefined) {
      return of(this.user);
    }
    this.loading = true;
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map((data: any) => {
        this.user = data.data;
        this.loading = false;
        return data['data'];
      }),
      catchError((error) => {
        alert('Error fetching user');
        throw error;
      })
    );
  }
}
