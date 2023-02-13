import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/MsgResponse.interface';

@Pipe({
  name: 'username'
})
export class GetUsernamePipe implements PipeTransform {

  constructor( private http: HttpClient ) { }

  transform(userId: number): Observable<string> {
    return this.http.get<User>(`http://localhost:8000/api/users/${userId}`)
      .pipe(
        map(user => user.username)
      )
  }

}
