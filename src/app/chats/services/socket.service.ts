import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Message } from '../interfaces/Chat.interface';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  messages: Message[] = [];

  constructor( private cs: ChatService ) {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', (messages: Message[]) => {
      this.messages = messages;
    })
  }

  sendMessage(message: string, chatId: number) {
    this.cs.sendMessage(message, chatId).subscribe( data => {
      this.socket.emit('sendMessage', data); 
    });
  }

  onMessageReceived() {
    return new Observable((observer) => {
      this.socket.on('messageReceived', (message) => {
        observer.next(message);
      });
    });
  }

  joinChat(chatId: number) {
    this.socket.emit( 'joinChat', chatId );
  }
}
