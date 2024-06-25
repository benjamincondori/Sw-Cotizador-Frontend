import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import { ModalSelectionAsesorComponent } from '../../../customer/components/modal-selection-asesor/modal-selection-asesor.component';
import { AlertsService } from 'src/app/shared/services/toast.service';
import { ChatComponent } from 'src/app/shared/components/chat/chat.component';
import { ChatService } from '../../services/chat.service';
import { SocketService } from 'src/app/shared/services/socket.service';

interface Chat {
  id: number;
  photo: string;
  name: string;
  lastname: string;
  title: string;
}

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.css']
})
export class SidebarChatComponent {
  @ViewChild(ModalSelectionAsesorComponent) modalSelectionAsesor!: ModalSelectionAsesorComponent;

  @Output() startChat: EventEmitter<void> = new EventEmitter<void>; 

  public modalOpen: boolean = false;
  
  chats!: Chat[];
  asesor: any;
  emailsAsesor: any[] =[]

  imgUser1: string = 'assets/avatars/300-1.jpg';

  constructor( 
    private alertsService: AlertsService,
    private chatService : ChatService,
    private socketService: SocketService) {
    this.chats = [];
  }
  
  async newChat() {
   await this.openSelectionAsesorModal();   
  }

  async openSelectionAsesorModal() {
    this.modalOpen = true;
  }

  closeSelectionAsesorModal() {
    this.modalOpen = false;
  }

  onChatSelected(chat: any) {
  this.asesor = chat; //aqui
  this.chatService.sendData(this.asesor);
  let id = 0;
  if (this.asesor != null) {
    if (this.chats.length > 0) {
      id = this.chats[this.chats.length - 1].id
    }
    if (!this.emailsAsesor.includes(this.asesor.email)){
        this.emailsAsesor.push(this.asesor.email);
      this.chats.push({
        id: id + 1,
        photo: this.imgUser1,
        name: this.asesor.name,
        lastname: this.asesor.lastName,
        title: this.asesor.email,
      });

      //crear sala de chat

    }else{
      this.alertsService.toast('Ya tienes un chat con el asesor', 'warning');      
    }
  }  
  }
}
