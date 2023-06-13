import { Component, EventEmitter, Output } from '@angular/core';

import { User } from 'src/app/interfaces/Response.interface';
import { ChatService } from '../../services/chat.service';
import { UsersService } from '../../data/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<User>();
  users: User[] = [];

  constructor( private cs: ChatService,
               private us: UsersService ) { }

  ngOnInit(): void {
    this.us.init();
    this.us.users$.subscribe( users => this.users = users );
    
    // this.cs.userList$.subscribe( users => {
    //   this.users = users;
    // });
  }

  sendUser( user: User ): void {
    this.userSelected.emit( user );
  }

}
