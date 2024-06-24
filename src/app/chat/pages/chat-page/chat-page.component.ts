import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullChat } from 'src/app/customer/interfaces/membership.interface';
import { MembershipService } from 'src/app/customer/services/membership.service';
import { ChatAI } from 'src/app/customer/interfaces/fullchat.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  @ViewChild('textareaRef') textarea!: ElementRef<HTMLTextAreaElement>;
  chatId?: string | null;
  data?: ChatAI;
  idChatAi!: number | null;
  
  public historyChats: FullChat[] | undefined;
  public modalOpen: boolean = false;
  selectedChatId: number | null = null; // Variable para almacenar el ID del chat seleccionado

  constructor(
    private route: ActivatedRoute,
    private membershipService: MembershipService,
    private chatService: ChatService,
  ) {
    this.membershipService.currentMembership$.subscribe((membership) => {
      this.historyChats = membership?.fullChats;
    });
    this.chatService.currentIdChatAi$.subscribe((idChatAi) => {
      this.idChatAi = idChatAi;
      console.log('Current Id Chat Ai: ', this.idChatAi);
      if (this.idChatAi) {
        this.getCurrentChatAi(this.idChatAi);
      }
      console.log('hasData: ', this.hasData());
    });
  }

  ngOnInit(): void {
    this.getInfoMembership();
    this.route.paramMap.subscribe((params) => {
      this.chatId = params.get('id');
    });
  }
  
  getInfoMembership(): void {
    this.membershipService.getInfoMembership().subscribe({
      next: (memebership) => {
        this.membershipService.setCurrentMembership(memebership);
      },
      error: (err) => {
        console.error('SidebarChatComponent::Error Get Info Membership: ', err);
      },
    });
  }

  sendData(): void {
    
  }
  
  showChat(data: FullChat): void {
    this.selectedChatId = data.id;
    this.chatService.setCurrentIdChatAi(data.chatAi.id);
  }
  
  getCurrentChatAi(idChatAi: number) {
    this.chatService.getChatAi(idChatAi).subscribe({
      next: (chatAi) => {
        this.data = chatAi;
        console.log('ChatIaComponent::Chat Ai: ', this.data);
      },
      error: (err) => {
        console.error('ChatIaComponent::Error Get Chat Ai: ', err);
      },
    });
  }
  
  hasData(): boolean {
    if (!this.data) return false;
    return this.data?.data != null && this.data?.images.length > 0;
  }

  autoResize() {
    this.textarea.nativeElement.style.height = 'auto'; // Restaura la altura a su valor automático
    this.textarea.nativeElement.style.height =
      this.textarea.nativeElement.scrollHeight + 'px'; // Establece la altura según el contenido
  }
  
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
