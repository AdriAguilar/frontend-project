import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor( private as: AuthService,
               private router: Router,
               private fb: FormBuilder ) { }
  
  ngOnInit(): void {
    this.myForm =  this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: [ , [ Validators.required, Validators.minLength(3)]],
      password: [ , [ Validators.required, Validators.minLength(6)]]
    })
  }

  notValid( field: string ) {
    return this.myForm.controls[ field ].errors
        && this.myForm.controls[ field ].touched;
  }
  
  submit(): void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.as.login( this.myForm.value ).subscribe( 
    _ => {
      this.router.navigate(['']);
    },
    error => {
      this.as.handleError(error);
    });
  }
}
