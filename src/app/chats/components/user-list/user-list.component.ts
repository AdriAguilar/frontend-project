import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../data/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/Response.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<User>();
  users$: Observable<User[]>;

  constructor( private us: UsersService ) { }

  ngOnInit(): void {
    this.us.init();
    this.users$ = this.us.users$;
  }

  sendUser( user: User ): void {
    this.userSelected.emit( user );
  }

}
