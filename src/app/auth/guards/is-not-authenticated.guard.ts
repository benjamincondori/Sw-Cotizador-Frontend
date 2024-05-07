import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserCurrent } from '../interfaces/user.interface';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router); 
  
  
  if (authService.isAuthenticated()) {
    const user = authService.getCurrentUser();
    if (user?.roles.includes('user')) {
      router.navigate(['/dashboard/home']);
    } else if (user?.roles.includes('admin')) {
      // TODO: Redirect to admin dashboard
    }
    console.log('Usuario autenticado')
    return false;
  } else {
    console.log('Usuario no autenticado')
    return true;
  }
  
};
