import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,} from '@angular/core';
import { AdvisorService } from 'src/app/admin/services/advisor.service';

interface Asesor {
  id: number;
  image: string;
  name: string;
  lastName: string;
  email: string;
  online : boolean;
  
}
@Component({
  selector: 'app-modal-selection-asesor',
  templateUrl: './modal-selection-asesor.component.html',
  styleUrls: ['./modal-selection-asesor.component.css']
})
export class ModalSelectionAsesorComponent implements OnInit{
  @Input() isOpen: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStartChat: EventEmitter<any> = new EventEmitter<any>();


  // imgUser1: string = 'assets/avatars/300-1.jpg';
  imgUser1: string = 'assets/images/img-user.png';
  selectedAsesorIndex: number | null = null;
  selectedChat: any;
  asesores: Asesor[] = [];

  constructor(private advisorService: AdvisorService){}

  ngOnInit(): void {
    this.getAllAdvisors();
  }

  closeModal() {
    this.onClose.emit();
  }

  selectChat(index: number) {
    this.selectedAsesorIndex = index;
  }

  async startChat(){

    
    if (this.selectedAsesorIndex !== null) {
       this.selectedChat = this.asesores[this.selectedAsesorIndex];
      this.onStartChat.emit(this.selectedChat);
      this.closeModal();
    } else {
      console.log('No se ha seleccionado ningún asesor');
    }
  }

  async getAllAdvisors() {
    this.advisorService.getAllAdvisors().subscribe(
      (res) => {     
        this.asesores = res.map(item => ({
          id: item.id,
          image: this.imgUser1,
          name: item.name,
          lastName: item.lastName,
          email: item.email,
          online: item.isActive
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
