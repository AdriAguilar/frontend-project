import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from 'src/environments/environment';
import { Response, Message, User } from '../interfaces/Chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
               private as: AuthService ) { }

  sendMessage(message: string, chatId: number) {
    return this.http.post(`${this.baseUrl}/messages`, {
      message: message,
      chat: chatId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${this.as.getToken()}`
      }
    });
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Response>(`${this.baseUrl}/chats/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${this.as.getToken()}`
      }
    }).pipe(
      map( resp => resp.data.messages)
    );
  }

  getUsers(chatId: number): Observable<User[]> {
    return this.http.get<Response>(`${this.baseUrl}/chats/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${this.as.getToken()}`
      }
    }).pipe(
      map( resp => resp.data.users)
    );
  }
  
}
