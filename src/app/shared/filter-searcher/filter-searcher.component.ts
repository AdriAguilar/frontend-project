import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FilterSearcherService } from './services/filter-searcher.service';

@Component({
  selector: 'app-filter-searcher',
  templateUrl: './filter-searcher.component.html',
  styleUrls: ['./filter-searcher.component.scss']
})
export class FilterSearcherComponent implements OnInit {
  @Input() placeholder: string;
  @Input() estilo: string;
  @Input() array$: Observable<any[]>;
  @Input() filterBy: string;
  private searchTerms = new Subject<string>();
  filteredArray$: Observable<any[]>

  constructor( private fss: FilterSearcherService ) { }

  ngOnInit(): void {
    this.filteredArray$ = this.searchTerms.pipe(
      debounceTime( 300 ),
      distinctUntilChanged(),
      switchMap( (term: string) => this.filterArray( term, this.filterBy ))
    )

    this.filteredArray$.subscribe( filteredArray => {
      this.fss.setFilteredArray( filteredArray );
    })
  }

  filterArray( term: string, filterBy: string ): Observable<any[]> {
    return this.array$.pipe(
      map(array => {
        return array.filter( item => {
          const value = item[filterBy];
          return (typeof value === 'string') ? value.toLowerCase().includes( term.toLowerCase() ) : false;
        });
      })
    );
  }

  onSearchTerm( term: string ): void {
    this.searchTerms.next( term );
  }

}
