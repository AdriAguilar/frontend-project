import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/Response.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  users: User[] = [];

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    // this.http.get<User[]>(`${environment.baseUrl}/users`, { headers: environment.headers })
    // .subscribe(data => this.users = data);
  }
  
  openChat(user: User): void {

  }
}
