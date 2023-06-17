import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from 'src/app/interfaces/Response.interface';
import { environment } from 'src/environments/environment';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor( private http: HttpClient,
               private as: AuthService ) { }

  updateUser( data: FormData ,id: number ) {
    return this.http.post<User>(`${this.baseUrl}/users/${id}/edit`, data, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }

  getAllUsersUsernames(): Observable<string[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    }).pipe(
      map( (users: User[]) => users.map( user => user.username )),
      catchError( () => of([]) )
    );
  }
}
