import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MaterialModule } from '../material/material.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { FilterSearcherComponent } from './filter-searcher/filter-searcher.component';


@NgModule({
  declarations: [
    ErrorPageComponent,
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    FilterSearcherComponent,
  ],
  exports: [
    ErrorPageComponent,
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    FilterSearcherComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    MatIconModule
  ]
})
export class SharedModule { }
