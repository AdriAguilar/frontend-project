import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GamesRoutingModule } from './games-routing.module';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { SearcherComponent } from './searcher/searcher.component';
import { GamesDetailComponent } from './pages/games-detail/games-detail.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SharedModule } from "../shared/shared.module";

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
        ReactiveFormsModule,
        MatIconModule,
        SharedModule
    ]
})
export class GamesModule { }
