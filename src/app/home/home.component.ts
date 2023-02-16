import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/Response.interface';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get<User[]>(`${environment.baseUrl}/users`, { headers: environment.headers })
    .subscribe(data => this.users = data);
  }
  
  openChat(user: User): void {

  }
}
