import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, filter, shareReplay } from 'rxjs';

import { User } from 'src/app/interfaces/Response.interface';
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
  
  user$: Observable<User>;

  constructor( private router: Router,
               private as: AuthService ) { }

  ngOnInit(): void {
    this.user$ = this.as.user$;
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  logout(): void {
    this.as.logout().subscribe( () => {
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
