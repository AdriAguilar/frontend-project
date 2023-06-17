import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/Products.interface';
import { Category } from '../../interfaces/Categories.interface';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product;
  categories: Category[];
  editForm: FormGroup;
  files: File[] = [];

  constructor( private cs: CategoriesService,
               private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private ps: ProductsService ) {}

  ngOnInit(): void {
    this.getProductandCategories().subscribe( () => {
      this.editForm = this.createForm();
    });
  }

  getProductandCategories(): Observable<any> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return forkJoin([
      this.ps.getProductById(id),
      this.cs.getAllCategories()
    ]).pipe(
      switchMap(([product, categories]) => {
        this.product = product;
        this.categories = categories;
        return of(null);
      })
    );
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [ this.product.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(32) ]],
      description: [ this.product.description, [ Validators.required, Validators.minLength(256), Validators.maxLength(1024) ]],
      price: [ this.product.price, Validators.required ],
      quantity: [ this.product.quantity, Validators.required ],
      category_id: [ this.product.category_id, Validators.required ],
      user_id: [ this.product.user_id ],
      images: [],
    })
  }

  notValid( field: string ) {
    return this.editForm.controls[ field ].errors
        && this.editForm.controls[ field ].touched;
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    console.log(event);
    if( this.files.length < 1 ) {
      this.files.push(...event.addedFiles);
    }
  }
  
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const fieldsToCompare = ['name', 'description', 'price', 'quantity', 'category_id'];

    for (let file of this.files) {
      formData.append('images', file, file.name);
    }

    for (const field of fieldsToCompare) {
      if ((this.product as any)[field] !== this.editForm.get(field)?.value) {
        formData.append(field, this.editForm.get(field)?.value);
      }
    }

    formData.append('_method', 'PUT');

    this.ps.updateProduct( formData, this.product.id ).subscribe(
      () => {
        this.router.navigate(['/products']);
      }
    )
    
  }
  
}
