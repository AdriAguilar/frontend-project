import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

import { ChatService } from '../../services/chat.service';
import { Message, User } from '../../../interfaces/Response.interface';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatId: number;
  msg: string = '';
  messages: Message[] = [];

  constructor( private route: ActivatedRoute,
               private ss: SocketService,
               private cs: ChatService ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe( params => this.chatId = params['id'] );
    this.ss.joinChat(this.chatId);
    this.cs.getMessages(this.chatId).subscribe( msgs => this.messages = msgs );
    this.ss.listenForMessages(this.chatId).subscribe( msg => {
      console.log(msg);
    });
  }

  submit(): void {
    if( this.msg.trim() === '' ) return;
    this.ss.sendMessage(this.msg, this.chatId);
  }
}
