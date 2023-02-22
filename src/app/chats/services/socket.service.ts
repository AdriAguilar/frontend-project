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
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message: string, chatId: number) {
    this.cs.sendMessage(message, chatId).subscribe( () => {
      this.socket.emit('sendMessage', chatId, message);
    });
  }

  listenForMessages(chatId: number): Observable<any> {
    return new Observable((observer) => {
      console.log('listening for messages...');
      this.socket.on('receiveMessage', (message: any) => {
        if (message.chat === chatId) {
          observer.next(message);
        }
      });
    });
  }

  joinChat(chatId: number) {
    this.socket.emit( 'joinChat', chatId );
  }
}
