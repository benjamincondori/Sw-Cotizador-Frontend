import { Component } from '@angular/core';
import { MenuItem } from 'src/app/shared/interfaces/menu-item.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-asesor-layout',
  templateUrl: './asesor-layout.component.html',
  styleUrls: ['./asesor-layout.component.css']
})
export class AsesorLayoutComponent {
  
  showSidebar: boolean = true;
  showFullNavbar: boolean = false;
  menuItems!: MenuItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.menuItems = [
      { icon: 'bx-home', name: 'Home', route: '/asesor/home' },
      { icon: 'bx-chat', name: 'Mensajes', route: '/asesor/chats' },
    ];
  }
}
