
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/Response.interface';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games/services/games.service'; 
import { Result } from '../games/interfaces/Games.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  daily : number;
  games$: Observable<Result[]>;
  game$: Observable<Result[]>;
  
  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    

    this.getRandom();
    this.games$ = this.gamesService.getGames5(this.daily);
    setInterval(() => {
      this.getRandom();
      this.games$ = this.gamesService.getGames5(this.daily);
      
    }, 86400000);

    this.game$ = this.gamesService.getOneTag();
  }
  getRandom(): void {
    this.daily = Math.floor(Math.random() * 5000) + 1;

  }
} 
