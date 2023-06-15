import { Component, HostListener } from '@angular/core';
import { concatMap, of } from 'rxjs';

import { UsersService } from '../../data/users.service';
import { User } from 'src/app/interfaces/Response.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  selectedUser: User | null = null;
  userListVisible: boolean = true;
  btnContent: string = '>';
  applyClass: boolean = false;

  constructor( private us: UsersService,
               private cs: ChatService ) { }

  openChat( user: User ): void {
    this.selectedUser = user;    
    this.us.createChat(user.id).pipe(
      concatMap( chat => {
        const chatId = chat.id;
        this.cs.setChatId( chatId );
        
        let chats = JSON.parse( localStorage.getItem('chats') ) || [];
        if (!chats.includes(chatId)) {
          chats.push(chatId);
        }
        localStorage.setItem('chats', JSON.stringify( chats ));

        return of(chatId);
      })
    ).subscribe( () => {
      this.userListVisible = !this.userListVisible;
      this.btnContent = this.userListVisible ? '>' : '<';
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.applyClass = window.innerWidth < 768;
  }

  toggleUserList() {
    this.userListVisible = !this.userListVisible;
    this.btnContent = this.userListVisible ? '>' : '<';
  }
  
}
