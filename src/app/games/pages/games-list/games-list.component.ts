import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Result } from '../../interfaces/Games.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games$: Observable<Result[]>;
  
  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getAllGames();
    
    
  }

  

}
