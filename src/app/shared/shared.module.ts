import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ErrorPageComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
