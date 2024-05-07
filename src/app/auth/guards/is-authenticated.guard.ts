import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { map, take } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);  
  
  // return authService.checkAuthStatus().pipe(
  //   map(isAuthenticated => {
  //     if (!isAuthenticated) {
  //       console.log('Usuario no autenticado')
  //       router.navigate(['/auth/login']);
  //     }
  //     console.log('Usuario autenticado')
  //     return isAuthenticated;
  //   })
  // );

  if (authService.isAuthenticated()) {
    console.log('Usuario autenticado')
    return true;
  } else {
    console.log('Usuario no autenticado')
    router.navigate(['/auth/login']);
    return false;
  }
  
  
};
