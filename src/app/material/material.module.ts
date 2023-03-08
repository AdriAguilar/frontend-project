import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [],
  exports: [
    MatMenuModule
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
