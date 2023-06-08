import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { GamesDetailComponent } from './pages/games-detail/games-detail.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

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
      },

    ]
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
