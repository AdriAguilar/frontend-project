
import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Result } from '../../interfaces/Games.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.scss']
})
export class GamesDetailComponent implements OnInit {
  @Input() game?: Result;
  gamebuy: any[] = [];
  games$: any[] = [];
  gameSeriesList: any;
  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private location: Location,
    private router: Router,
    ) { }
  ngOnInit(): void {
    this.getGames();
    this.fetchGameSeries();
    
  }
  getGames(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gamesService.getGames(id)
      .subscribe(game => this.game = game);
  }

  fetchGameSeries(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gamesService.getGameSeries(id)
      .subscribe(
        gameSeries => {
          this.gameSeriesList = gameSeries;
        },
        error => {
          console.log('Error al obtener los datos:', error);
        }
      );
  }
  reloadPage() {
    window.location.reload();
  }
  
  

  goBack(): void {
    this.location.back();
  }
  addToCart(game:Result){
    return this.gamesService.addGame(game);
  }

  getRange(percent: number): number[] {
    const maxImages = 5;
    const imageCount = Math.ceil((percent / 100) * maxImages);
    return Array(imageCount).fill(0);
  }
  
}