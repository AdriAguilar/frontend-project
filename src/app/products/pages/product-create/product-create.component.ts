import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/Categories.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor( private cs: CategoriesService ) { }

  ngOnInit(): void {
    this.categories$ = this.cs.getAllCategories();
  }
}
