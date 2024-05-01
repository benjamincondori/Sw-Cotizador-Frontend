import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item.interface';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css'],
})
export class CustomerLayoutComponent {
  showSidebar: boolean = true;
  showFullNavbar: boolean = false;
  menuItems!: MenuItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.menuItems = [
      { icon: 'bx-home', name: 'Home', route: '/dashboard/home' },
      { icon: 'bx-chat', name: 'Chats', route: '/dashboard/chats' },
    ];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSidebar =
          !this.activatedRoute.firstChild?.snapshot.routeConfig?.path?.includes(
            'chats'
          );
        this.showFullNavbar = !this.showSidebar;
      }
    });
  }
}
