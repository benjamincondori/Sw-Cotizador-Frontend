import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatsPageComponent } from './pages/chats-page/chats-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      // { path: 'chats', component: ChatsPageComponent },
      {
        path: 'chats',
        loadChildren: () =>
          import('../chat/chat.module').then((m) => m.ChatModule),
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
