import { Component, EventEmitter, Output } from '@angular/core';

import { User } from 'src/app/interfaces/Response.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<User>();
  users: User[] = [];

  constructor( private cs: ChatService ) { }

  ngOnInit(): void {
    this.cs.userList$.subscribe( users => {
      this.users = users;
    });
  }

  sendUser( user: User ): void {
    this.userSelected.emit( user );
  }

}
