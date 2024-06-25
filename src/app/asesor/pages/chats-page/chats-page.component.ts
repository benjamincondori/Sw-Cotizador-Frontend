import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SocketService } from 'src/app/shared/services/socket.service';
import { Chat } from 'src/app/shared/interfaces/chat.interface';
import { Message } from 'src/app/shared/interfaces/chat.interface';
import { AdvisorService } from 'src/app/admin/services/advisor.service';

@Component({
  selector: 'app-chats-page',
  templateUrl: './chats-page.component.html',
  styleUrls: ['./chats-page.component.css']
})
export class ChatsPageComponent implements OnInit{
  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  imgUser1: string = 'assets/avatars/300-1.jpg';
  imgUser2: string = 'assets/avatars/300-2.jpg';

  iconTelephone: string = 'assets/icons/ic-telephone.png';
  iconCamera: string = 'assets/icons/ic-videocam.png';
  iconInfo: string = 'assets/icons/ic-info.png';

  iconSendMessage: string = 'assets/icons/ic-send.png';
  iconAddFile: string = 'assets/icons/ic-add-file.png';
  iconCheck: string = 'assets/icons/ic-check.png';

  newMessage: string = '';
  selectedImage: File | null = null;
  messages: any[] = [];
  imageUrl: SafeUrl | null = null; 
  room: string = "chat1"
  userName: string ="";
  chats = [
    { 
      image: this.imgUser1, 
      name: 'Usuario 1', 
      lastMessage: 'Este es el último mensaje...', 
      online: true,
      messages: ['Hola', '¿Cómo estás?', 'Este es el último mensaje...']
    },
    { 
      image: this.imgUser2, 
      name: 'Usuario 2', 
      lastMessage: 'Hola, ¿cómo estás?', 
      online: false,
      messages: ['Hola', '¿Qué tal?', 'Hola, ¿cómo estás?']
    },
  ];

  chats1: Chat[] = [
    { 
      image: this.imgUser1, 
      name: 'Usuario 1', 
      lastMessage: 'Este es el último mensaje...', 
      online: true,
      messages: [
        { type: 'text', content: 'Hola', sender: 'user', timestamp: new Date() },
        { type: 'text', content: '¿Cómo estás?', sender: 'user', timestamp: new Date() },
        { type: 'text', content: 'Este es el último mensaje...', sender: 'user', timestamp: new Date() }
      ]
    },
    { 
      image: this.imgUser2, 
      name: 'Usuario 2', 
      lastMessage: 'Hola, ¿cómo estás?', 
      online: false,
      messages: [
        { type: 'text', content: 'Hola', sender: 'bot', timestamp: new Date() },
        { type: 'text', content: '¿Qué tal?', sender: 'bot', timestamp: new Date() },
        { type: 'text', content: 'Hola, ¿cómo estás?', sender: 'bot', timestamp: new Date() }
      ]
    },
  ];

  selectedChatIndex: number | null = null;
  client: any;

  constructor( 
    private sanitizer: DomSanitizer, 
    private socketService: SocketService,
    private advisorService: AdvisorService){
      this.socketService.onMessage((data: any) => {
        console.log(data);
        this.messages.push({
          type: 'text',
          text: data.message,
          sender: 'bot',
          timestamp: new Date()
        })
      });
    }
  
    ngOnInit(): void {
      this.advisorService.getClient().subscribe(
      (res)=>{
      
        this.client = res;
        var elem =   { 
          image: this.imgUser1, 
          name: this.client.name, 
          lastMessage: '', 
          online: true,
          messages: [
            { type: 'text', content: 'Hola', sender: 'user', timestamp: new Date() },
            { type: 'text', content: '¿Cómo estás?', sender: 'user', timestamp: new Date() },
            { type: 'text', content: 'Este es el último mensaje...', sender: 'user', timestamp: new Date() }
          ]
        }
   
      }  
      )
    }
  sendTextMessage(): void {
    
    if (this.newMessage.trim() !== '') {

      this.socketService.sendMessage(this.room,this.newMessage,this.userName)  
      this.messages.push({
        type: 'text',
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });
      this.newMessage = '';
    }
  }

  selectChat(index: number) {
    this.selectedChatIndex = index;
    this.userName = this.chats[this.selectedChatIndex].name
    this.socketService.joinRoom(this.room);
  }

  autoResize(): void {
    this.textareaRef.nativeElement.style.height = 'auto'; // Restaura la altura a su valor automático
    this.textareaRef.nativeElement.style.height = this.textareaRef.nativeElement.scrollHeight + 'px'; // Establece la altura según el contenido
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedImage = inputElement.files?.[0] || null;
  }

  sanitizeImageUrl(image: File): SafeUrl {
    const objectUrl = URL.createObjectURL(image);
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

   
  openImageModal(imageUrl: SafeUrl) {
    this.imageUrl = imageUrl; // Establece la URL de la imagen para mostrar en el modal
  }
  
}
