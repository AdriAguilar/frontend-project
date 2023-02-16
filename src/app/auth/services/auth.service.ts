import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Logged, Registered, User } from '../../interfaces/Response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthSubject: BehaviorSubject<User>;
  public userAuth: Observable<User>;
  
  private baseUrl: string = environment.baseUrl;
  private httpOptions = environment.httpOptions;
  private headers = environment.headers;

  constructor( private http: HttpClient ) {
    this.userAuthSubject = new BehaviorSubject<User>(null);
    this.userAuth = this.userAuthSubject.asObservable();
  }

  get userAuthValue(): User {
    return this.userAuthSubject.value;
  }

  who(): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/who`, this.httpOptions, {
      headers: this.headers
    });
  }

  login(usernameEmail: string, password: string): Observable<Logged> {
    return this.http.post<Logged>(`${this.baseUrl}/auth/login`, {
      username: usernameEmail,
      password: password
    }, this.httpOptions)
    .pipe(
      tap( (response: Logged) => {
        localStorage.setItem('auth-token', response.token);
      }),
      switchMap( (response: Logged) => {
        return this.who().pipe(
          map((user: User) => {
            this.userAuthSubject.next(user);
            return response;
          })
        );
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
    });
  }
}
