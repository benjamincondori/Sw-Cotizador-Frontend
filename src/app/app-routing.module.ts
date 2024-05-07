import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './auth/pages/welcome-page/welcome-page.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
