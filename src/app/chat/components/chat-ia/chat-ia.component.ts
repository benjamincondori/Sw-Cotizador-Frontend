import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-ia',
  templateUrl: './chat-ia.component.html',
  styleUrls: ['./chat-ia.component.css']
})
export class ChatIaComponent {
  @Input() data: any;
  
  imageUrl: string | null = null; 
  
  openImageModal(imageUrl: string) {
    this.imageUrl = imageUrl; // Establece la URL de la imagen para mostrar en el modal
  }

  closeImageModal() {
    this.imageUrl = null; // Establecer la URL de la imagen en null para cerrar el modal
  }
  
}
