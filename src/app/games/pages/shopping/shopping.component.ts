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
  }

  deleteGames(id:number){
    this.gamesService.deleteGames(id);
  }
  transaction(operation:string, id:number){
    const game = this.gamesService.findGamesbyId(id)
    if(game){
      if(operation === 'mens' && game.cantidad > 0){
        game.cantidad = game.cantidad - 1;
      }
      if(operation === 'mas'){
        game.cantidad = game.cantidad + 1;
      }
      if(game.cantidad === 0){
        this.deleteGames(id);
      }
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
