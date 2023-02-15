import { Component } from '@angular/core';
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

  constructor( private as: AuthService ) { }
  
  submit(): void {
    if( this.usernameEmail === undefined || this.password === undefined ) return;
    if( this.usernameEmail.trim().length === 0 || this.password.trim().length === 0) return;
    
    this.as.login(this.usernameEmail, this.password)
    .subscribe( (data: Logged) => console.log(data.token) );
  }
}
