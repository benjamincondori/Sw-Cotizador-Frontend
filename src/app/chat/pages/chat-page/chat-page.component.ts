import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarChatComponent } from '../../components/sidebar-chat/sidebar-chat.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  @ViewChild('textareaRef') textarea!: ElementRef<HTMLTextAreaElement>;
  chatId?: string | null;
  data: any;
  images!: string[];
  asesor: any;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatId = params.get('id');
      // Aquí puedes usar this.chatId para cargar el chat correspondiente
    });
    
    this.images = [
      './assets/images/img-ia-1.png',
      './assets/images/img-ia-2.png',
      './assets/images/img-ia-3.png',
      './assets/images/img-ia-4.png',
    ]
    
  }
  
  sendData(): void {
    this.data = {
      images: this.images,
      messages: this.chatId? this.chatId : 'no hay mensajes',
    }
  }
  
  autoResize() {
    this.textarea.nativeElement.style.height = 'auto'; // Restaura la altura a su valor automático
    this.textarea.nativeElement.style.height = this.textarea.nativeElement.scrollHeight + 'px'; // Establece la altura según el contenido
  }

  
}
