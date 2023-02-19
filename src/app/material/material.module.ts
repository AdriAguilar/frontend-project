import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [],
  exports: [
    MatMenuModule
  ],
  imports: [
    CommonModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
