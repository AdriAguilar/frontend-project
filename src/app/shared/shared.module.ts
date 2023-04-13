import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    ErrorPageComponent,
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    ErrorPageComponent,
    LoaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class SharedModule { }
