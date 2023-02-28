import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Result } from '../interfaces/Games.interface';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit{
  games$!: Observable<Result[]>;
  private searchTerms = new Subject<string>();

  constructor(private gamesService: GamesService) { }

  onSearchGames(term: string):void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.games$ = this.searchTerms.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((term: string) => this.gamesService.onSearchGames(term))
    )
  }
}
