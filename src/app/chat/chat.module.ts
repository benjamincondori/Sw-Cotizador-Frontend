import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarChatComponent } from './components/sidebar-chat/sidebar-chat.component';


@NgModule({
  declarations: [
    ChatLayoutComponent,
    InitPageComponent,
    ChatPageComponent,
    SidebarChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
  ]
})
export class ChatModule { }
