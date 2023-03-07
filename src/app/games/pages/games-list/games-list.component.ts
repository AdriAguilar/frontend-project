import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Result } from '../../interfaces/Games.interface';
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
  game$: Observable<Result[]>;

  
  
  constructor(private gamesService: GamesService,
              private fb: FormBuilder) { }

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


}


