import { SafeUrl } from "@angular/platform-browser";

export interface Chat {
    image: string;
    name: string;
    lastMessage: string;
    online: boolean;
    messages: Message[];
  }
  
  export interface Message {
    type: 'text' | 'image'; // Puedes expandir este tipo si tienes más tipos de mensajes
    content: string | SafeUrl; // Contenido del mensaje: texto o URL segura de imagen
    sender: 'user' | 'bot'; // Quién envió el mensaje
    timestamp: Date;
  }