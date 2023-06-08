import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Products.interface';
import { ProductsService } from '../../services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product: Product;
  hostname: string = environment.hostname;

  constructor( private route: ActivatedRoute,
               private ps: ProductsService ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getProductById( id ).subscribe( product => {
      this.product = product;
    });
  }
  
}
