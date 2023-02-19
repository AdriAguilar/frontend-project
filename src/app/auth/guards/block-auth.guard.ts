import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlockAuthGuard implements CanActivate {
  constructor( private as: AuthService ) { }
  canActivate(): boolean {
    if( this.as.isLoggedIn() ) {
      return false;
    }
    return true;
  }
  
}
