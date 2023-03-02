import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from '../../interfaces/Categories.interface';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

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
      name: [ , [ Validators.required, Validators.min(2) ]],
      description: [ , [ Validators.required, Validators.max(512) ]],
      price: [ , Validators.required ],
      quantity: [ , Validators.required ],
      category_id: [ , Validators.required ],
      user_id: []
    })
  }

  notValid( field: string ) {
    return this.myForm.controls[ field ].errors
        && this.myForm.controls[ field ].touched;
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit() {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.controls['user_id'].setValue( this.userId );
    
    this.ps.createProduct( this.myForm.value ).subscribe(
      () => {
        this.router.navigate(['/product']);
      }
    );
  }
}
