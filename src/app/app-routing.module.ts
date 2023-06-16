import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ChatsComponent } from './chats/pages/chats/chats.component';
import { AboutUsComponent } from './games/pages/about-us/about-us.component';
import { ShoppingComponent } from './games/pages/shopping/shopping.component';
import { MyProductsComponent } from './products/pages/my-products/my-products.component';
import { ProductDetailsComponent } from './products/pages/product-details/product-details.component';
import { ProductFormComponent } from './products/components/product-form/product-form.component';

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
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule ),
  },
  {
    path: 'my-products',
    component: MyProductsComponent
  },
  {
    path: 'my-products/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'my-products/:id/edit',
    component: ProductFormComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then( m => m.GamesModule ),
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  },
  {
    path: 'shopping',
    component: ShoppingComponent
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
