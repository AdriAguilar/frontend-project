import { Component } from '@angular/core';
import { User } from '../interfaces/Response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users: User[] = [];

  openChat(user: User): void {

  }
}
