import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GamesResponse, Result } from '../interfaces/Games.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  url = "https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199e&dates=2019-09-01,2019-09-30&platforms=18,1,7";

  constructor(private http: HttpClient 
    
    ) {}

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getAllGames(): Observable<Result[]> {
      return this.http.get<GamesResponse>(this.url).pipe(
        map((response) => response.results )
      );
        ; 
        
    }
}
