import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/Response.interface';
import { Router } from '@angular/router';
import { AuthUser } from '../../interfaces/Response.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('menuButton') menuButton: ElementRef;
  menuVisible: boolean = false;
  clickListenerAdded: boolean = false;
  
  user: AuthUser;

  constructor( private http: HttpClient,
               private router: Router,
               private as: AuthService ) {}

  ngOnInit(): void {    
    this.http.get<AuthUser>(`${environment.baseUrl}/auth/who`, { headers: environment.headers })
    .subscribe( data => {
      console.log(data);
      this.user = data
    });
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  logout() {
    this.as.logout().subscribe( _ => {
      localStorage.removeItem('auth-token');
      this.router.navigate(['./auth/login']);
    });
  }

  
  // Dropdown Menu
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
    document.removeEventListener('click', this.onDocumentClick.bind(this));
    if (this.menuVisible) {
      document.addEventListener('click', this.onDocumentClick.bind(this));
      document.querySelector('.menu-icon').classList.add('open');
    } else {
      document.querySelector('.menu-icon').classList.remove('open');
    }
  }

  onDocumentClick(event: MouseEvent) {
    const menu = document.getElementById('menu-dropdown');
    if (this.menuVisible) {
      if (
        menu &&
        !menu.contains(event.target as Node) &&
        !menu.contains((event.target as Node).parentNode) &&
        !this.menuButton.nativeElement.contains(event.target)
      ) {
        this.menuVisible = false;
        document.removeEventListener('click', this.onDocumentClick.bind(this));
        document.querySelector('.menu-icon').classList.remove('open');
      }
    }
  }
}
