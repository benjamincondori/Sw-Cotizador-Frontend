import { Component, Input, OnInit } from '@angular/core';
import { ChatAI } from 'src/app/customer/interfaces/fullchat.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-ia',
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.css']
})
export class ChatIaComponent implements OnInit {
  @Input() data?: ChatAI;
  
  constructor(private chatService: ChatService) {}
  
  ngOnInit(): void {
    // const idChatAi = this.chatService.currentIdChatAi;
    // if (idChatAi) {
    //   this.getCurrentChatAi(idChatAi);
    // }
  }
  
  imageUrl: string | null = null; 
  
  // getCurrentChatAi(idChatAi: number) {
  //   this.chatService.getChatAi(idChatAi).subscribe({
  //     next: (chatAi) => {
  //       this.data = chatAi;
  //     },
  //     error: (err) => {
  //       console.error('ChatIaComponent::Error Get Chat Ai: ', err);
  //     },
  //   });
  // }
  
  openImageModal(imageUrl: string) {
    this.imageUrl = imageUrl; // Establece la URL de la imagen para mostrar en el modal
  }

  closeImageModal() {
    this.imageUrl = null; // Establecer la URL de la imagen en null para cerrar el modal
  }
  
}
