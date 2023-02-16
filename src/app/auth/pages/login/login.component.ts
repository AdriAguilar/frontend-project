import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Logged } from '../../../interfaces/Response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usernameEmail: string;
  password: string;
  errorMessage: string;

  constructor( private as: AuthService,
               private router: Router ) { }
  
  submit(): void {
    if( this.usernameEmail === undefined || this.password === undefined ) return;
    if( this.usernameEmail.trim().length === 0 || this.password.trim().length === 0) return;
    
    this.as.login(this.usernameEmail, this.password)
    .subscribe( (data: Logged) => {
      this.router.navigate(['./']);
    });
  }
}
