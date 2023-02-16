import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Registered } from '../../../interfaces/Response.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor( private as: AuthService,
               private router: Router ) { }

  submit() {
    if( this.name === undefined || this.username === undefined || this.email === undefined || this.password === undefined ) return;
    if( this.name.trim().length === 0 || this.username.trim().length === 0 || this.email.trim().length === 0 || this.password.trim().length === 0 ) return;

    this.as.register( this.name, this.username, this.email, this.password )
    .subscribe((data: Registered) => {
      localStorage.setItem('auth-token', data.token);
      this.router.navigate(['./']);
    });
  }
}
