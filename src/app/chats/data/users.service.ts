import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/Response.interface';
import { Observable, shareReplay, BehaviorSubject, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { debug, RxJsLoggingLevel } from 'src/app/debug/debug';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  constructor( private http: HttpClient,
               private as: AuthService ) { }

  init() {
    const http$ = this.getUsers();
    http$.subscribe( users => this.usersSubject.next(users) )
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    }).pipe(
      map( users => users.filter(user => user.id !== this.getAuthUserId()) )
    );
  }

  getAuthUserId() {
    let id: number;
    this.as.user$.pipe(
      map( user => id = user.id ),
      debug(RxJsLoggingLevel.INFO, "id")
    )
    return id;
  }
}
