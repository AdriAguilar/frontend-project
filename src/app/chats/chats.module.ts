import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatsRoutingModule } from './chats-routing.module';

import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChatComponent,
    ChatsComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatsRoutingModule,
    SharedModule
  ]
})
export class ChatsModule { }
