import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesorLayoutComponent } from './asesor-layout/asesor-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChatsPageComponent } from './pages/chats-page/chats-page.component';

const routes: Routes = [{
  path:'',
  component:AsesorLayoutComponent,
  children:[
    { path: 'home', component: HomePageComponent },
    { path: 'chats', component: ChatsPageComponent },
    { path: '**', redirectTo: 'home' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesorRoutingModule { }
