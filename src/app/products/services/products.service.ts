import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/Products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = environment.baseUrl;

  constructor( private http: HttpClient,
               private as: AuthService ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }

  createProduct( data: FormData  ) {
    return this.http.post<Product>(`${this.baseUrl}/products/create`, data, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }

  getProductImages( id: number ) {
    return this.http.get<string>(`${this.baseUrl}/products/${id}/images`, {
      headers: {
        Authorization: `Bearer ${this.as.getToken()}`
      }
    });
  }
  
}
