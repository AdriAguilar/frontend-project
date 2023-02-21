import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UsersService } from '../../data/users.service';
import { User } from 'src/app/interfaces/Response.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  users$: Observable<User[]>;

  constructor( private us: UsersService,
               private router: Router ) { }

  ngOnInit(): void {
    this.us.init();
    this.users$ = this.us.users$;
  }
  
  openChat( userId: number ): void {
    this.us.createChat(userId).subscribe( (chat) => {
      const chatId = chat.id
      let chats = JSON.parse( localStorage.getItem('chats') ) || [];
      if (!chats.includes(chatId)) {
        chats.push(chatId);
      }
      localStorage.setItem('chats', JSON.stringify( chats ));
      this.router.navigate([`chat/${chatId}`]);
    });
  }
}
