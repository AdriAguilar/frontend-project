import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

import { ChatService } from '../../services/chat.service';
import { Message, User } from '../../../interfaces/Response.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private socket: any;
  chatId: number = 1;
  msg: string = '';
  messages: Message[] = [];

  constructor( private cs: ChatService ) { }
  
  ngOnInit(): void {

  }

  lastMessage(message: Message): Message {
    if (this.messages.length > 0) {
      const sortedMessages = this.messages.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
      return sortedMessages[0];
    } else {
      return null;
    }
  }

  submit(): void {
    if( this.msg.trim() === '' ) return;
    
    // this.cs.sendMessage(this.msg, this.username, this.chatId).subscribe(
    //   _ => this.msg = ''
    // );
  }
}
