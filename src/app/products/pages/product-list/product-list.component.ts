import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/Products.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  defaultImg: string;

  constructor( private ps: ProductsService ) { }
  
  ngOnInit(): void {
    this.products$ = this.ps.getProducts();
  }

}
