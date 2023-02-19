import { Component } from '@angular/core';

import { User } from 'src/app/interfaces/Response.interface';
import { UsersService } from '../../data/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  users$: Observable<User[]>;

  constructor( private us: UsersService ) { }

  ngOnInit(): void {
    this.us.init();
    this.users$ = this.us.users$;
  }
  
  openChat( user: User): void {
    
  }
}
