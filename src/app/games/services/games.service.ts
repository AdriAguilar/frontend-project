import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GamesResponse, Result } from '../interfaces/Games.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  NUM_GAMES = 40;
  pageSize = 40;
  page = 1;
  url = `https://api.rawg.io/api/games`;
  arca = `?key=2d592714bd91467cad84f2655700199e&dates=2019-09-01,2019-09-30&platforms=18,1,7&page_size=${this.NUM_GAMES}`;
  api = `?key=2d592714bd91467cad84f2655700199e&page_size=${this.NUM_GAMES}`;
  prueba = `?key=2d592714bd91467cad84f2655700199e&page=4666&page_size=5`;
  prueba3 = `https://api.rawg.io/api/games?key=2d592714bd91467cad84f655700199e`;
  urlSearch = "https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199e&search={term}&page_size=5";
  prueba2 = "https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199e";



  public total: number = 0;

  

  

  constructor(private http: HttpClient) {}

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


    getAll(page: number, page_size: number ): Observable<any> {
      let urlPag = `${this.prueba3}&page=${page}&page_size=${this.pageSize}`
      return this.http.get<GamesResponse>(urlPag).pipe(
        map((response) => response.results )
      );
    }

    getGamesFilter(tags: string): Observable<Result[]> {
      const url = `${this.prueba2}&tags=${tags}&page_size=40`;
      return this.http.get<GamesResponse>(url)
      .pipe(
        map((response) => response.results )
      );
    }


    getJuegoPorId(id: string) {
      return this.http.get(`${this.url}/${id}${this.api}`);
    }

    getPlatforms(): Observable<any> {
      return this.http.get<any>('https://api.rawg.io/api/platforms?key=2d592714bd91467cad84f2655700199e');
    }
    
    getGamesByPlatform(platformId: string): Observable<any> {
      return this.http.get<any>(`https://api.rawg.io/api/games?key=2d592714bd91467cad84f2655700199eplatforms=${platformId}`);
    }
    
    private myList:Result[]=[];

    private myCart = new BehaviorSubject<Result[]>([]);
    myCart$ = this.myCart.asObservable();

    addGame(game:Result){
      if(this.myList.length === 0){
        game.cantidad = 1
        this.myList.push(game)
        this.myCart.next(this.myList);
      }else{
        const gameMod = this.myList.find((element)=>{
          return element.id === game.id
        })
        if(gameMod){
          gameMod.cantidad = gameMod.cantidad + 1;
        }else{
          game.cantidad = 1;
          this.myList.push(game);
          this.myCart.next(this.myList)
        }
      }
    }
    deleteGames(id:number){
      this.myList = this.myList.filter((game)=>{
        return game.id != id
      })
      this.myCart.next(this.myList)
    }
    findGamesbyId(id:number){
      return this.myList.find((element)=>{
        return element.id === id
      })
    }

}

