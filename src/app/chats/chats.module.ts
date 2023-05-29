import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatsRoutingModule } from './chats-routing.module';

import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatsComponent,
    MenuComponent,
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatsRoutingModule
  ]
})
export class ChatsModule { }
