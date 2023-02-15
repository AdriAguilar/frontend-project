import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [
    ChatComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ChatModule { }
