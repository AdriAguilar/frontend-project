import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { SearcherComponent } from './searcher/searcher.component';
import { GamesDetailComponent } from './pages/games-detail/games-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GamesListComponent,
    GamesDetailComponent,
    SearcherComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatPaginatorModule,
    MatIconModule,
  ]
})
export class GamesModule { }
