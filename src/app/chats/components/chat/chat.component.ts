import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

import { ChatService } from '../../services/chat.service';
import { Message, User } from '../../../interfaces/Response.interface';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatId: number = 1;
  msg: string = '';
  messages: Message[] = [];

  constructor( private ss: SocketService,
               private cs: ChatService ) { }
  
  ngOnInit(): void {
    this.ss.joinChat(this.chatId);
    this.cs.getMessages(this.chatId).subscribe(console.log);
    this.messages = this.ss.messages;
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
    // if( this.msg.trim() === '' ) return;
    // this.ss.sendMessage(this.msg, this.chatId)
  }
}
