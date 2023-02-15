import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username: string;

  constructor() {}

  ngOnInit(): void {
    // this.username = this.authService.getUsername();
  }

  logout() {
    // this.authService.logout();
  }
}
