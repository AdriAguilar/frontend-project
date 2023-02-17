import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ErrorPageComponent } from './error-page/error-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    ErrorPageComponent,
    NavbarComponent,
    LoaderComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class SharedModule { }
