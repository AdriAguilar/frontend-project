import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { ErrorPageComponent } from './error-page/error-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { MenuComponent } from '../chats/menu/menu.component';
import { ChatsModule } from '../chats/chats.module';



@NgModule({
  declarations: [
    ErrorPageComponent,
    LoaderComponent,
    NavbarComponent,
  ],
  exports: [
    ErrorPageComponent,
    LoaderComponent,
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    ChatsModule
  ]
})
export class SharedModule { }
