import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from 'src/environments/environment';
import { Response, Message } from '../../interfaces/Response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private httpOptions = environment.httpOptions;
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient,
               private as: AuthService ) { }

  sendMessage(message: string, chatId: number) {
    return this.http.post(`${this.baseUrl}/messages`, {
      message: message,
      chat: chatId,
    }, this.httpOptions);
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
  
}
