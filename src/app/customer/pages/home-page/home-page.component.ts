import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public modalOpen: boolean = false;

  constructor() {}
  
  ngOnInit(): void {
  }

  openPayPalModal() {
    this.modalOpen = true;
  }

  closePaypalModal() {
    this.modalOpen = false;
  }

}
