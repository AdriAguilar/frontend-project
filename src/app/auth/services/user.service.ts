import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from 'src/app/interfaces/Response.interface';
import { environment } from 'src/environments/environment';

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
}
