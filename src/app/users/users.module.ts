import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../products/pipes/capitalize.pipe';
import { ShortDescriptionPipe } from '../products/pipes/short-description.pipe';
import { ProductsModule } from '../products/products.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule
  ]
})
export class UsersModule { }
