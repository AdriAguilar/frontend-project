import { Component, Input, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';
import { Message, User } from '../../../interfaces/Response.interface';
import { SocketService } from '../../services/socket.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatUser: User;
  load: boolean;
  chatId: number;
  msg: string = '';
  messages: Message[] = [];

  constructor( private ss: SocketService,
               private cs: ChatService,
               private as: AuthService ) { }
  
  ngOnInit(): void {
    this.cs.getChatId().pipe(
      switchMap( chatId => {
        const load: boolean = chatId === null ? true : false;
        this.load = load;
        
        if( !load ) {
          console.log('chat.ts:', this.chatUser.username, chatId);

          this.chatId = chatId;
          this.as.getUser().pipe(
            switchMap( user => {
              console.log('getUser', user);
              
              this.ss.joinChat( chatId, user.username );
              return of( null );
            })
          ).subscribe();
          this.cs.getMessages( chatId ).subscribe( msgs => this.messages = msgs );
          this.ss.listenForMessages( chatId ).subscribe( msg => this.messages.push(msg) );
        }

        return of( null );
      })
    ).subscribe();
  }

  submit(): void {
    if( this.msg.trim() === '' ) return;
    this.ss.sendMessage(this.msg, this.chatId).subscribe( () => {
      this.msg = '';
    });
  }
}
