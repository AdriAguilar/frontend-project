import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Subscription, concatMap, of } from 'rxjs';

import { ChatService } from '../../services/chat.service';
import { Message, User } from '../../../interfaces/Response.interface';
import { SocketService } from '../../services/socket.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit ,AfterViewChecked {
  private msgSub: Subscription;
  @Input() chatUser: User;
  authUser: User;
  load: boolean;
  chatId: number;
  msg: string = '';
  messages: Message[] = [];
  currentChatId: number;

  constructor( private ss: SocketService,
               private cs: ChatService,
               private as: AuthService ) { }
  
  ngOnInit(): void {
    this.cs.getChatId().pipe(
      concatMap( chatId => {
        const load: boolean = chatId === null ? true : false;
        this.load = load || true;
        
        if( !load && chatId !== this.currentChatId ) {
          if( this.currentChatId ) {
            this.ss.leaveChat( this.currentChatId, this.authUser.username );
            this.msgSub.unsubscribe();
          }

          // console.log('chat.ts:', this.chatUser.username, chatId);

          this.chatId = chatId;
          this.as.getUser().pipe(
            concatMap( user => {
              // console.log('getUser', user);
              this.authUser = user;
              
              this.ss.joinChat( chatId, user.username );
              return of( null );
            })
          ).subscribe();
          this.cs.getMessages( chatId ).subscribe( msgs => {
            this.messages = msgs;
            this.load = false;
          });
          this.msgSub = this.ss.listenForMessages( chatId, this.authUser ).subscribe( msg => this.messages.push(msg) );

          this.currentChatId = chatId;
        }

        return of( null );
      })
    ).subscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown(): void {
    const scroll = document.getElementById('scrollToBottom');
    scroll.scrollTop = scroll.scrollHeight;
  }

  submit(): void {
    if( this.msg.trim() === '' ) return;
    const formattedDate = new Date(Date.now() + 7200000).toISOString().slice(0, 19).replace("T", " ");
    console.log( formattedDate );

    this.ss.sendMessage(this.msg, this.chatId, this.authUser.username, formattedDate, this.authUser.id).subscribe( () => {
      this.msg = '';
    });
  }
}
