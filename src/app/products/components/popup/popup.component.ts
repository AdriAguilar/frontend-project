import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() productId: number; 
  showPopup: boolean = false;

  constructor( private pop: PopupService,
               private ps: ProductsService,
               private router: Router ) { }

  ngOnInit() {
    this.pop.showPopup$.subscribe(() => {
      this.showPopup = true;
    });
  }

  hide() {
    this.showPopup = false;
  }

  deleteProduct( productId: number ) {
    this.ps.deleteProduct( productId ).subscribe(
      () => {
        this.router.navigate(['/products']);
      }
    )
  }
}
