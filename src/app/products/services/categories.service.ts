import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/Categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = environment.baseUrl;
  
  constructor( private http: HttpClient,
               private as: AuthService ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }
  
}
