import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import Pusher from 'pusher-js';

import { ChatService } from '../../services/chat.service';
import { Message, User } from '../../../interfaces/Response.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  username: string = 'username';
  chatId: number = 1;
  msg: string = '';
  messages: Message[] = [];

  constructor( private cs: ChatService ) { }
  
  ngOnInit(): void {
    Pusher.logToConsole = true;
    
    const pusher = new Pusher('946df37c47de4150e3ba', {
      cluster: 'eu'
    });
  
    const channel = pusher.subscribe(`chat.${this.chatId}`);
  
    channel.bind('message-sent', (data: string) => {
      // TODO: Obtener el id del usuario que envia el mensaje y ya estaría listo el chat.
      let user: User = {
        username: this.username,
      }
      let msg: Message = {
        user: user,
        chat_id: this.chatId,
        message: data,
      }
      this.messages.push(msg);
    });
    
    this.cs.getMessages(this.chatId)
    .pipe(
      map(response => response.data.messages)
    )
    .subscribe(
      (messages) => {
        console.log(messages);
        this.messages = messages;
      }
    );
  }

  submit(): void {
    if( this.msg.trim() === '' ) return;
    
    this.cs.sendMessage(this.msg, this.username, this.chatId).subscribe(
      _ => this.msg = ''
    );
  }
}
