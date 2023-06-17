import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { Product } from '../../interfaces/Products.interface';
import { ProductsService } from '../../services/products.service';
import { environment } from 'src/environments/environment';
import { FilterSearcherService } from 'src/app/shared/filter-searcher/services/filter-searcher.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  noProductsFound: boolean = false;
  defaultImg: string;
  hostname: string = environment.hostname;

  constructor( private ps: ProductsService,
               private fss: FilterSearcherService ) { }
  
  ngOnInit(): void {
    this.products$ = this.ps.getProducts();
    this.filteredProducts$ = this.fss.filteredArray$.pipe(
      startWith(null),
      switchMap( filteredArray => {
        if (filteredArray) {
          this.noProductsFound = filteredArray.length === 0;
          return of(filteredArray);
        } else {
          this.noProductsFound = false;
          return this.products$;
        }
      })
    );
  }
  
}
