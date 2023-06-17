import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterSearcherService {
  private filteredArraySubject = new Subject<any[]>();
  filteredArray$: Observable<any[]> = this.filteredArraySubject.asObservable();

  setFilteredArray( filteredArray: any[] ): void {
    this.filteredArraySubject.next( filteredArray );
  }
}
