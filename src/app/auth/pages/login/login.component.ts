import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

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
    
    this.as.login(this.usernameEmail, this.password).subscribe( 
      _ => {
      this.router.navigate(['./']);
      },
      ( data: HttpErrorResponse ) => {
        console.error(data.error.error);
      });
  }
}
