import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../../services/games.service';

import { Result } from '../../interfaces/Games.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games$: Observable<Result[]>;
  totalGames: number = 0;
  page = 1;
  pageSize = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getAllGames();
  }


  loadGames(): void{
    this.games$ = this.gamesService.getAll(this.page, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadGames();
  }
}

