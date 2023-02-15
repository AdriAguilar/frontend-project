import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Logged } from '../../interfaces/Response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = environment.httpOptions;
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  login(usernameEmail: string, password: string): Observable<Logged> {
    return this.http.post<Logged>(`${this.baseUrl}/auth/login`, {
      username: usernameEmail,
      password: password
    }, this.httpOptions);
  }

  register(name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, {
      name: name,
      username: username,
      email: email,
      password: password
    }, this.httpOptions);
  }
}
