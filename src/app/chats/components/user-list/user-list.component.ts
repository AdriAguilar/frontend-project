import { Component, EventEmitter, Output } from '@angular/core';

import { User } from 'src/app/interfaces/Response.interface';
import { ChatService } from '../../services/chat.service';
import { UsersService } from '../../data/users.service';
import { Observable, of, startWith, switchMap } from 'rxjs';
import { FilterSearcherService } from 'src/app/shared/filter-searcher/services/filter-searcher.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<User>();
  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;
  noUsersFound: boolean = false;

  constructor( private cs: ChatService,
               private us: UsersService,
               private fss: FilterSearcherService ) { }

  ngOnInit(): void {
    this.us.init();
    this.users$ = this.us.users$;
    this.filteredUsers$ = this.fss.filteredArray$.pipe(
      startWith(null),
      switchMap( filteredArray => {
        if (filteredArray) {
          this.noUsersFound = filteredArray.length === 0;
          return of(filteredArray);
        } else {
          this.noUsersFound = false;
          return this.users$;
        }
      })
    );
    
    // this.cs.userList$.subscribe( users => {
    //   this.users = users;
    // });
  }

  sendUser( user: User ): void {
    this.userSelected.emit( user );
  }

}
