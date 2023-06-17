import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  myCart$ = this.gamesService.myCart$
  

  constructor(private gamesService:GamesService){}

  ngOnInit(): void {
    this.gamesService.updateGameCount();
  }

  deleteGames(id:number){
    this.gamesService.deleteGames(id);
  }
  transaction(operation:string, id:number){
    this.gamesService.transaction(operation, id);
  }

  reloadPage() {
    window.location.reload();
  }

}
