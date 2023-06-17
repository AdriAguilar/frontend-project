import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from '../../interfaces/Categories.interface';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  userId: number;
  categories$: Observable<Category[]>;
  myForm: FormGroup;
  files: File[] = [];

  constructor( private cs: CategoriesService,
               private ps: ProductsService,
               private as: AuthService,
               private fb: FormBuilder,
               private router: Router ) { }

  ngOnInit(): void {
    this.as.getUser().subscribe( user => this.userId = user.id);
    this.categories$ = this.cs.getAllCategories();
    this.myForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: [ , [ Validators.required, Validators.minLength(3), Validators.maxLength(32) ]],
      description: [ , [ Validators.required, Validators.minLength(256), Validators.maxLength(1024) ]],
      price: [ , Validators.required ],
      quantity: [ , Validators.required ],
      category_id: [ , Validators.required ],
      user_id: [],
      images: [],
    });
  }

  notValid( field: string ) {
    return this.myForm.controls[ field ].errors
        && this.myForm.controls[ field ].touched;
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

submit() {
  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }

  this.myForm.controls['user_id'].setValue(this.userId);

  const formData = new FormData();
  for (let file of this.files) {
    formData.append('images', file, file.name);
  }
  formData.append('name', this.myForm.get('name').value);
  formData.append('description', this.myForm.get('description').value);
  formData.append('price', this.myForm.get('price').value);
  formData.append('quantity', this.myForm.get('quantity').value);
  formData.append('category_id', this.myForm.get('category_id').value);
  formData.append('user_id', this.myForm.get('user_id').value);

  this.ps.createProduct(formData).subscribe(
    () => {
      this.router.navigate(['/products']);
    }
  );
}

}
