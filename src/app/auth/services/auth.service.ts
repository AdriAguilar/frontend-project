import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, concatMap, map, Observable, of, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Logged, Registered, User } from '../../interfaces/Response.interface';
import { debug, RxJsLoggingLevel } from 'src/app/debug/debug';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  user$: Observable<User>;
  
  private baseUrl: string = environment.baseUrl;
  private httpOptions = environment.httpOptions;

  constructor( private http: HttpClient ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user$ = this.userSubject.asObservable();
  }

  login( params: FormData): Observable<User> {
    return this.http.post<Logged>(`${this.baseUrl}/auth/login`, params, this.httpOptions).pipe(
      map( resp => resp.token ),
      tap( token => localStorage.setItem('auth-token', token) ),
      concatMap(token => this.getUser(token)),
      tap( user => this.userSubject.next(user) )
    );
  }

  register( params: FormData ): Observable<User> {
    return this.http.post<Registered>(`${this.baseUrl}/auth/register`, params, this.httpOptions).pipe(
      map( resp => resp.token ),
      tap( token => localStorage.setItem('auth-token', token) ),
      concatMap( token => this.getUser(token) ),
      tap( user => this.userSubject.next(user) )
    );
  }

  logout() {
    if( this.getToken() ) {
      return this.http.post(`${this.baseUrl}/auth/logout`, this.httpOptions, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      }).pipe(
        tap( _ => {
          this.userSubject.next( null );
          localStorage.removeItem('auth-token');
        })
      );
    }
    return of(null);
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getUser(token: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/who`, {
      headers: {
        'Cache-Control': 'max-age=600, public',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error';
    if( error.error instanceof ErrorEvent ) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
