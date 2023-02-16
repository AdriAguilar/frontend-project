import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/Response.interface';
import { Router } from '@angular/router';
import { AuthUser } from '../../interfaces/Response.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuVisible: boolean = false;
  
  user: AuthUser;

  constructor( private http: HttpClient,
               private router: Router,
               private as: AuthService ) {}

  ngOnInit(): void {
    this.http.get<AuthUser>(`${environment.baseUrl}/auth/who`, { headers: environment.headers })
    .subscribe( data => {
      console.log(data);
      this.user = data
    });
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.as.logout().subscribe(_ => {
      localStorage.removeItem('auth-token');
      this.router.navigate(['./auth/login']);
    });
  }

}
