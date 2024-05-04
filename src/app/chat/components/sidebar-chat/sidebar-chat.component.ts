import { Component, OnInit } from '@angular/core';

interface Chat {
  id: number;
  photo: string;
  name: string;
  title: string;
}

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.css']
})
export class SidebarChatComponent {
  chats!: Chat[];
  
  constructor() {
    this.chats = [];
  }
  
  newChat() {
    let id = 0;
    if (this.chats.length > 0) {
      id = this.chats[this.chats.length - 1].id
    }
    this.chats.push({
      id: id + 1,
      photo: './assets/avatars/300-1.jpg',
      name: 'John Doe',
      title: 'Cotización de construcción',
    });
  }
  
}
