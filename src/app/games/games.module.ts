import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { SearcherComponent } from './searcher/searcher.component';
import { GamesDetailComponent } from './pages/games-detail/games-detail.component';




@NgModule({
  declarations: [
    GamesListComponent,
    GamesDetailComponent,
    SearcherComponent

  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
