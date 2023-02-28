import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ChatsComponent } from './chats/pages/chats/chats.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chats/chats.module').then( m => m.ChatsModule ),
    canLoad: [ AuthGuard ],
  },
  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule ),
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
