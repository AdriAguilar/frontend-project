import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Response, User } from '../../interfaces/Response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private httpOptions = environment.httpOptions;
  private baseUrl: string = environment.baseUrl;
  private wsUrl: string = environment.wsUrl;

  constructor( private http: HttpClient ) { }

  sendMessage(message: string, username: string, chatId: number) {
    return this.http.post(`${this.baseUrl}/messages`, {
      username: username,
      message: message,
      chat: chatId,
    }, this.httpOptions);
  }

  getMessages(chatId: number): Observable<Response> {
    return this.http.get<Response>(`${this.wsUrl}/chat/${chatId}`, this.httpOptions);
  }
  
}
