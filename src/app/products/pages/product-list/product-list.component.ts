import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Product } from '../../interfaces/Products.interface';
import { ProductsService } from '../../services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  defaultImg: string;
  hostname: string = environment.hostname;

  constructor( private ps: ProductsService,
               private sanitizer: DomSanitizer ) { }
  
  ngOnInit(): void {
    this.products$ = this.ps.getProducts();
  }

  // safeUrl( url: string ): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustUrl( url );
  // }
  
}
