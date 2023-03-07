import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { GamesDetailComponent } from './pages/games-detail/games-detail.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GamesListComponent
      },
      {
        path: ':id',
        component: GamesDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
