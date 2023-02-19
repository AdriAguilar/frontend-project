import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService) { }
  
  canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['/auth/login']);
      return false;
  }
  
  canLoad(): boolean {
      if( !this.authService.isLoggedIn() ) {
        return false;
      }
      return true;
  }
}
