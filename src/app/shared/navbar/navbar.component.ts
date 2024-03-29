import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from 'src/app/interfaces/Response.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GamesService } from '../../games/services/games.service';
import { Result } from '../../games/interfaces/Games.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  
  template: `
    <button (click)="toggleDarkMode()">Toggle Dark Mode</button>
  `
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuButton') menuButton: ElementRef;
  menuVisible: boolean = false;
  menuHbVisible: boolean = false;
  clickListenerAdded: boolean = false;

  navIcon: HTMLElement;
  menuContainer: HTMLElement;
  menuLinks: NodeListOf<Element>;
  user$: Observable<User>;
  hostname: string = environment.hostname;

  myCart$ = this.gamesService.myCart$
  gameList: Result[];
  gameCount: number;
  totalGameCount: number;

  constructor( private router: Router,
                private as: AuthService,
                private gamesService: GamesService) { }

  ngOnInit(): void {
    this.user$ = this.as.user$;
    this.gameList = this.gamesService.myList;
    this.gameCount = this.gamesService.gameCount;
    this.totalGameCount = this.gamesService.getTotalGameCount();
    this.toggleHamburgerMenu();
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

  toggleHamburgerMenu(): void {
    this.navIcon = document.getElementById('hb-icon');
    this.menuContainer = document.getElementById('hb-menu');
    this.menuLinks = document.querySelectorAll('.menu-link');
  
    this.navIcon.addEventListener('click', this.onNavIconClick.bind(this), { once: true });
  
    this.menuLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.stopPropagation();
        this.onMenuLinkClick();
      });
    });
  
    document.addEventListener('click', this.onMenuClick.bind(this));
  }

  onNavIconClick(): void {
    this.menuHbVisible = !this.menuVisible;
    this.navIcon.classList.toggle('open');
    this.menuContainer.classList.toggle('visible');
  }

  onMenuLinkClick(): void {
    this.menuHbVisible = false;
    this.navIcon.classList.remove('open');
    this.menuContainer.classList.remove('visible');
  }

  onMenuClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('#hb-icon') &&
      !target.closest('#hb-menu') &&
      this.menuHbVisible
    ) {
      this.menuHbVisible = false;
      this.navIcon.classList.remove('open');
      this.menuContainer.classList.remove('visible');
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

  addGame(game: Result): void {
    this.gamesService.addGame(game);
  }

  deleteGames(id: number): void {
    this.gamesService.deleteGames(id);
  }

  transaction(operation: string, id: number): void {
    this.gamesService.transaction(operation, id);
  }
}