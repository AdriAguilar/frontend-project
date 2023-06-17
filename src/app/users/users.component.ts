import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, startWith, switchMap, tap } from 'rxjs';

import { User } from '../interfaces/Response.interface';
import { UserService } from '../auth/services/user.service';
import { environment } from 'src/environments/environment';
import { ChatService } from '../chats/services/chat.service';
import { AuthService } from '../auth/services/auth.service';
import { Product } from '../products/interfaces/Products.interface';
import { FilterSearcherService } from '../shared/filter-searcher/services/filter-searcher.service';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  authUser: User;
  user$: Observable<User>;
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  noProductsFound: boolean = false;
  usernames: string[];
  username: string;
  hostname: string = environment.hostname;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private us: UserService,
               private cs: ChatService,
               private as: AuthService,
               private ps: ProductsService,
               private fss: FilterSearcherService ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.as.getUser().subscribe( user => this.authUser = user );
    this.us.getAllUsersUsernames().subscribe( users => {
      this.usernames = users;
      if( !this.userExists( this.username ) ) {
        this.router.navigate(['404']);
      } else {
        this.user$ = this.us.getAllUsers().pipe(
          map( users => users.find( user => user.username === this.username )),
          tap( user => {
            const userId = user.id;
            this.products$ = this.ps.getProductsByUserId( userId );
          })
        )
      }
    });

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

  userExists( username: string ): boolean {
    return this.usernames.includes( username );
  }

  addUserToUserList( user: User ): void {
    this.cs.addUser( user );
    this.router.navigate(['/chat']);
  }

}
