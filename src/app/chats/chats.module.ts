import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';

import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChatComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatsRoutingModule,
    SharedModule
  ]
})
export class ChatsModule { }
