import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from '../shared/shared.module';
import { ShortDescriptionPipe } from './pipes/short-description.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { PopupComponent } from './components/popup/popup.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductCreateComponent,
    ShortDescriptionPipe,
    CapitalizePipe,
    MyProductsComponent,
    ProductFormComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SharedModule
  ],
  exports: [
    CapitalizePipe,
    ShortDescriptionPipe
  ]
})
export class ProductsModule { }
