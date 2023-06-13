import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from 'src/environments/environment';
import { Response, Message, User, UserStorageData } from '../interfaces/Chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string = environment.baseUrl;
  private UserListKey: string = environment.localStorageUserListKey;
  
  private chatIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private userListSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  userList$: Observable<User[]> = this.userListSubject.asObservable();

  constructor( private http: HttpClient,
               private as: AuthService ) {
    this.loadUserList();              
  }

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

  setChatId( chatId: number ): void {
    this.chatIdSubject.next( chatId );
  }

  getChatId(): Observable<number | null> {
    return this.chatIdSubject.asObservable();
  }

  loadUserList(): void {
    const userListString = localStorage.getItem( this.UserListKey );
    const userList = userListString ? JSON.parse( userListString ) : [];
    this.userListSubject.next( userList );
  }

  addUser( user: User ): void {
    const userData: UserStorageData = {
      id: user.id,
      username: user.username
    }
    
    const userList = this.userListSubject.value.slice();
    userList.push( userData );
    this.userListSubject.next( userList );
    this.saveUserList( userList );
  }

  saveUserList( userList: User[] ): void {
    localStorage.setItem( this.UserListKey, JSON.stringify( userList ) );
  }
  
}
