import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatLayoutComponent } from './layouts/chat-layout/chat-layout.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarChatComponent } from './components/sidebar-chat/sidebar-chat.component';
import { ChatIaComponent } from './components/chat-ia/chat-ia.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ModalSelectionAsesorComponent } from '../customer/components/modal-selection-asesor/modal-selection-asesor.component';


@NgModule({
  declarations: [
    ChatLayoutComponent,
    InitPageComponent,
    ChatPageComponent,
    SidebarChatComponent,
    ChatIaComponent,
    IntroductionComponent,
    ModalSelectionAsesorComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
  ]
})
export class ChatModule { }
