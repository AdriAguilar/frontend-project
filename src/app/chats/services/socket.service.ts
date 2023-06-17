import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { ChatService } from './chat.service';
import { Message, User } from 'src/app/interfaces/Response.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor( private cs: ChatService ) {
    this.socket = io('http://localhost:3000');
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message: string, chatId: number, username: string, date: string, userId: number) {
    return this.cs.sendMessage(message, chatId).pipe(
      concatMap(async () => this.socket.emit('sendMessage', chatId, message, username, date, userId))
    );
  }

  listenForMessages( chatId: number, loggedInUser: User ): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('receiveMessage', (message: Message) => {
        if( message.chat === chatId ) {
          message.isMyMessage = message.user === loggedInUser;
          observer.next(message);
        }
      });
    });
  }

  joinChat(chatId: number, username: string) {
    this.socket.emit( 'join', chatId, username );
  }

  leaveChat(chatId: number, username: string) {
    this.socket.emit( 'leave', chatId, username );
  }
}
