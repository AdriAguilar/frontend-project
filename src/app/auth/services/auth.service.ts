import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Logged, Registered, User } from '../../interfaces/Response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthSubject = new BehaviorSubject<User>(null);
  userAuth$ = this.userAuthSubject.asObservable();
  token: string = '';
  
  private baseUrl: string = environment.baseUrl;
  private httpOptions = environment.httpOptions;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  constructor( private http: HttpClient ) { }

  get userAuthValue(): User {
    return this.userAuthSubject.getValue()
  }

  getUserInfo(): Observable<User> {
    console.log(this.token);
    return this.http.get<User>(`${this.baseUrl}/auth/who`, {
      headers: this.headers
    });
  }

  login(usernameEmail: string, password: string): Observable<Logged> {
    return this.http.post<Logged>(`${this.baseUrl}/auth/login`, {
      username: usernameEmail,
      password: password
    }, this.httpOptions).pipe(
      tap( (response: Logged) => {
        this.token = response.token;
        localStorage.setItem('auth-token', this.token);
        this.userAuthSubject.next( response.user );
      })
    );
  }

  register(name: string, username: string, email: string, password: string): Observable<Registered> {
    return this.http.post<Registered>(`${this.baseUrl}/auth/register`, {
      name: name,
      username: username,
      email: email,
      password: password
    }, this.httpOptions);
  }

  logout() {
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, this.httpOptions, {
      headers: this.headers
    }).pipe(
      tap( _ => {
        this.userAuthSubject.next( null );
      })
    );
  }
}
