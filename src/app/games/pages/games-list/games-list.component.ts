
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../../services/games.service';

import { Result } from '../../interfaces/Games.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  myForm: FormGroup;
  games$: Observable<Result[]>;
  totalGames: number = 0;
  page = 1;
  pageSize = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor( private gamesService: GamesService,
              private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getAllGames();
    this.myForm = this.fb.group({
      tags: []
    });
  }

  submit(): void{
    const tags = this.myForm.controls["tags"].value;
    this.games$ = this.gamesService.getGamesFilter(tags);
    console.log(tags);
    

  }


  loadGames(): void{
    this.games$ = this.gamesService.getAll(this.page, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadGames();
  }

  addToCart(game:Result){
    return this.gamesService.addGame(game);
  }
}

