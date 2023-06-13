import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/Response.interface';
import { Observable, shareReplay, BehaviorSubject, map, tap, switchMap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { debug, RxJsLoggingLevel } from 'src/app/debug/debug';
import { Chat, ChatResponse } from '../../interfaces/Response.interface';

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
    return this.as.getUser().pipe(
      switchMap( user => {
        const userId = user.id;
        return this.http.get<User[]>(`${environment.baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${this.as.getToken()}`
          }
        }).pipe(
          map( users => users.filter( user => user.id !== userId ) )
        );
      })
    );
  }

  getUserById( id: number ): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }

  createChat(userId_2: number): Observable<Chat> {
    return this.as.getUser().pipe(
      switchMap( AuthUser => {
        const userId_1 = AuthUser.id;
        return this.http.post<Chat>(`${environment.baseUrl}/chats/create`, {
          user_1: userId_1,
          user_2: userId_2
        }, {
          headers: {
            Authorization: `Bearer ${this.as.getToken()}`
          }
        })
      })
    );
  }
}
