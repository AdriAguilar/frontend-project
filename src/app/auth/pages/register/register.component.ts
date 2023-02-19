import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Registered } from '../../../interfaces/Response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup;

  constructor( private as: AuthService,
               private router: Router,
               private fb: FormBuilder ) { }
  
  ngOnInit(): void {
    this.myForm =  this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [ , [ Validators.required, Validators.minLength(3)]],
      username: [ , [ Validators.required, Validators.minLength(3)]],
      email: [ , [ Validators.required, Validators.email]],
      password: [ , [ Validators.required, Validators.minLength(6)]]
    })
  }

  notValid( field: string ) {
    return this.myForm.controls[ field ].errors
        && this.myForm.controls[ field ].touched;
  }
  
  submit() {
    this.as.register( this.myForm.value ).subscribe(
    _ => {
      this.router.navigate(['']);
    },
    error => {
      this.as.handleError(error);
    });
  }
}
