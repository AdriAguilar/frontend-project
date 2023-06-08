
import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Result } from '../../interfaces/Games.interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.scss']
})
export class GamesDetailComponent implements OnInit {
  @Input() game?: Result;
  gamebuy: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private location: Location) { }
  ngOnInit(): void {
    this.getGames();
  } 
  getGames(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gamesService.getGames(id)
      .subscribe(game => this.game = game);
  }
  goBack(): void {
    this.location.back();
  }

  agregarJuego(boton: HTMLButtonElement) {
    const id = boton.id;
    this.gamesService.getJuegoPorId(id).subscribe((juego: any) => {
      const nuevoJuego = { nombre: juego.name };
      this.gamebuy.push(nuevoJuego);
      console.log(nuevoJuego);
    });
  }
  


}
