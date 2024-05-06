import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatsPageComponent } from './pages/chats-page/chats-page.component';
import { SharedModule } from '../shared/shared.module';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';


@NgModule({
  declarations: [
    CustomerLayoutComponent,
    HomePageComponent,
    ChatsPageComponent,
    SettingPageComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
