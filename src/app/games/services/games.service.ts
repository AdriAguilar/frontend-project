import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GamesResponse, Result } from '../interfaces/Games.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  NUM_GAMES = 40;
  
  url = `https://api.rawg.io/api/games`;
  arca = `?key=2d592714bd91467cad84f2655700199e&dates=2019-09-01,2019-09-30&platforms=18,1,7&page_size=${this.NUM_GAMES}`;
  api = `?key=2d592714bd91467cad84f2655700199e&page_size=${this.NUM_GAMES}`;
  prueba = `?key=2d592714bd91467cad84f2655700199e&page=4666&page_size=5`;
  urlSearch = "https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199e&search={term}&page_size=5";
  urlPag = "https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199e&ordering=-released";
  prueba2 = "https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199e";


  constructor(private http: HttpClient

    ) {}

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getAllGames(): Observable<Result[]> {
      return this.http.get<GamesResponse>(this.url + this.api).pipe(
        map((response) => response.results )
      );
    }
    getOneTag(): Observable<Result[]> {
      const url = `${this.prueba2}&page_size=1`;
      return this.http.get<GamesResponse>(url).pipe(
        map((response) => response.results )
      );
    }
    

    getGames5(random:number): Observable<Result[]> {
      const Url = `${this.url + this.prueba}&page=${random}&page_size=5`; 
      return this.http.get<GamesResponse>(Url).pipe(
        map((response) => response.results )
      );
    }

    onSearchGames(term: string): Observable<Result[]> {
      if (!term.trim()) {
        return of([]);
      }
      return this.http.get(`${this.urlSearch.replace('{term}', term)}`).pipe(
        map((data: any) => {
          console.log(data.results);
          return data.results;
        })
      );
    }

    getGames(id: number): Observable<Result> {
      const url = `${this.url}/${id}${this.api}`;
      return this.http.get<Result>(url);

    }

    getGamesFilter(tags: string): Observable<Result[]> {
      const url = `${this.prueba2}&tags=${tags}&page_size=40`;
      return this.http.get<GamesResponse>(url)
      .pipe(
        map((response) => response.results )
      );
    }
    getGamesFilterP(platforms: string): Observable<Result[]> {
      const url = `${this.prueba2}&platforms=${platforms}&page_size=40`;
      return this.http.get<GamesResponse>(url)
      .pipe(
        map((response) => response.results )
      );
    }






}

