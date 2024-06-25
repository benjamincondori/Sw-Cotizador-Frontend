import { Component } from '@angular/core';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css']
})
export class InitPageComponent {

  public modalOpen: boolean = false;

  openSelectionAsesorModal() {
    console.log('open modal');
    this.modalOpen = true;
    
  }

  closeSelectionAsesorModal() {
    this.modalOpen = false;
  }

}
