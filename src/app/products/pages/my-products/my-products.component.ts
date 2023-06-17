import { Component, OnInit } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from '../../interfaces/Products.interface';
import { environment } from 'src/environments/environment';
import { FilterSearcherService } from 'src/app/shared/filter-searcher/services/filter-searcher.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  noProductsFound: boolean = false;
  hostname: string = environment.hostname;

  constructor( private ps: ProductsService,
               private as: AuthService,
               private fss: FilterSearcherService ) { }

  ngOnInit(): void {
    this.products$ = this.as.getUser().pipe(
      switchMap(user => {
        const userId = user.id;
        return this.ps.getProductsByUserId(userId);
      })
    );

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
