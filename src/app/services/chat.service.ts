import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsgResponse, User } from '../interfaces/MsgResponse.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl: string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(message: string, username: string, chatId: number) {
    return this.http.post(`${this.baseUrl}/messages`, {
      username: username,
      message: message,
      chat: chatId,
    });
  }

  getMessages(chatId: number): Observable<MsgResponse> {
    return this.http.get<MsgResponse>(`${this.baseUrl}/chats/${chatId}`);
  }
  
}
