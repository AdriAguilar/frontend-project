import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ChatsComponent
      },
      {
        path: ':id',
        loadComponent: () => import('./components/chat/chat.component').then(c => c.ChatComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
