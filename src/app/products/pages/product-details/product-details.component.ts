import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Product } from '../../interfaces/Products.interface';
import { ProductsService } from '../../services/products.service';
import { environment } from 'src/environments/environment';

import { ChatService } from 'src/app/chats/services/chat.service';
import { User } from 'src/app/chats/interfaces/Chat.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  authUser: User;
  seller: User;
  product: Product;
  hostname: string = environment.hostname;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private ps: ProductsService,
               private cs: ChatService,
               private as: AuthService,
               private pop: PopupService ) { }

  ngOnInit(): void {
    this.getProductAndSeller();
  }

  getProductAndSeller(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    forkJoin([
      this.ps.getProductById(id),
      this.ps.getSeller(id),
      this.as.getUser()
    ]).subscribe(([product, seller, user]) => {
      this.product = product;
      this.seller = seller;
      this.authUser = user;
    });
  }

  addUserToUserList(): void {
    this.cs.addUser( this.seller );
    this.router.navigate(['/chat']);
  }

  showPopup(): void {
    this.pop.show();
  }
  
}
