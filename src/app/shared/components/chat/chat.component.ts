import { Component,ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription, timestamp } from 'rxjs';
import { Router } from '@angular/router';

import { SidebarChatComponent } from 'src/app/chat/components/sidebar-chat/sidebar-chat.component';
import { ChatService } from 'src/app/chat/services/chat.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {


  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('imageInput') imageInputRef!: ElementRef;
  @ViewChild('chatMessages', { static: true }) chatMessagesRef!: ElementRef;

  dataSubscription?: Subscription;
  
  imgUser1: string = 'assets/avatars/300-1.jpg';
  messages: any[] = [];
  newMessage: string = '';
  selectedImage: File | null = null;
  initialHeightTextarea!: string;
  imageUrl: SafeUrl | null = null; 
  asesor:any
  img :string ="assets/images/img-user.png";
  messageList: string[] = []
  room: string ="chat1"

  constructor(
    private sanitizer: DomSanitizer,
    private chatService: ChatService,
    private socketService: SocketService,
    private router: Router
  ) {
    this.socketService.onMessage((data: any) => {
      console.log(data);

      this.messages.push({
        type: 'text',
        text: data.message,
        sender: 'bot',
        timestamp: new Date()
      })
        // Agregar mensaje recibido al array de mensajes
    });
  }
  
  ngOnInit(): void {
    this.dataSubscription = this.chatService.getData().subscribe(
      (value) => {
        if(value != null){
          console.log('Valor recibido del BehaviorSubject:', value);
          this.asesor = value; 
          console.log('Datos específicos:', this.asesor);
        }else{
          console.log(' no hay value'); 
        }
      },
      (error) => {
        console.error('Error al obtener datos del BehaviorSubject:', error);
      }
    );

      this.socketService.joinRoom(this.room);

  //   this.socketService.getNewMessage().subscribe({
  //     next: ( message:string) =>{
  //       this.messageList.push(message);
  //     }
  //   })
  }

  ngAfterViewInit() {
    this.initialHeightTextarea = this.textareaRef.nativeElement.style.height; // Guarda la altura inicial
  }

  // sendMessage() {
  //   this.socketService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

  closeRoom(){
    this.router.navigate(['/dashboard/chats']);
    this.socketService.leaveRoom(this.room)
    
  }
  sendTextMessage(): void {
    
    if (this.newMessage.trim() !== '') {
      this.socketService.sendMessage(this.room,this.newMessage, this.asesor.name)  
      this.messages.push({
        type: 'text',
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });
      this.newMessage = '';
      this.resetInput();
    }
  }

  sendImageMessage(): void {
    if (this.selectedImage) {
      this.messages.push({
        type: 'image',
        image: this.selectedImage,
        sender: 'user',
        timestamp: new Date()
      });
      this.selectedImage = null;
      this.resetInput();
    }
  }
  
  openImagePicker(): void {
    this.imageInputRef.nativeElement.click();
  }

  sanitizeImageUrl(image: File): SafeUrl {
    const objectUrl = URL.createObjectURL(image);
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }
  
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedImage = inputElement.files?.[0] || null;
  }
  
  resetInput(): void {
    setTimeout(() => {
      this.scrollToBottom();
    });
    this.textareaRef.nativeElement.style.height = this.initialHeightTextarea;
  }

  scrollToBottom(): void {
    this.chatMessagesRef.nativeElement.scrollTop = this.chatMessagesRef.nativeElement.scrollHeight;
  }
  
  autoResize(): void {
    this.textareaRef.nativeElement.style.height = 'auto'; // Restaura la altura a su valor automático
    this.textareaRef.nativeElement.style.height = this.textareaRef.nativeElement.scrollHeight + 'px'; // Establece la altura según el contenido
  }
  
  openImageModal(imageUrl: SafeUrl) {
    this.imageUrl = imageUrl; // Establece la URL de la imagen para mostrar en el modal
  }

  closeImageModal() {
    this.imageUrl = null; // Establecer la URL de la imagen en null para cerrar el modal
  }
}
