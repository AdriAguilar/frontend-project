import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { SearcherComponent } from './searcher/searcher.component';

import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    GamesListComponent,
    SearcherComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ReactiveFormsModule
  ]
})
export class GamesModule { }
