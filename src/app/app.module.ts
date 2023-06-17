import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ShoppingComponent } from './games/pages/shopping/shopping.component';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from './users/users.component';
import { ProductsModule } from "./products/products.module";





@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ShoppingComponent,
        UsersComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        MatIconModule,
        ProductsModule
    ]
})
export class AppModule { }
