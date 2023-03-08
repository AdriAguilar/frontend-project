import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { SearcherComponent } from './searcher/searcher.component';
import { GamesDetailComponent } from './pages/games-detail/games-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
  declarations: [
    GamesListComponent,
    GamesDetailComponent,
    SearcherComponent

  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatPaginatorModule


  ]
})
export class GamesModule { }
