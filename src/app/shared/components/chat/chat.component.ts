import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  @ViewChild('textareaRef') textarea!: ElementRef<HTMLTextAreaElement>;

  messages: any[] = [];
  newMessage: string = '';
  rows: number = 1;

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date(),
      });
      this.newMessage = '';
    }
  }

  limitLines(): void {
    const textLength = this.textarea.nativeElement.value.length;
    const limit: number = 23;
    if (textLength > limit && textLength <= limit * 2) {
      this.rows = 2;
    } else if (textLength > limit * 2 && textLength <= limit * 3) {
      this.rows = 3;
    } else if (textLength <= limit) {
      this.rows = 1;
    }
  }
}
