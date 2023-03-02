import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
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
    return this.cs.sendMessage(message, chatId).pipe(
      concatMap(async () => this.socket.emit('sendMessage', chatId, message))
    );
  }

  listenForMessages(chatId: number): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message: any) => {
        observer.next(message);
      });
    });
  }

  joinChat(chatId: number) {
    this.socket.emit( 'join', chatId );
  }
}
