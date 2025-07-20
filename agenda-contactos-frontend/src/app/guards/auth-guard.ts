import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // El usuario está logueado, permite el acceso a la ruta
  } else {
    // El usuario no está logueado, redirige a la página de login
    router.navigate(['/login']);
    return false; // Bloquea el acceso a la ruta
  }
};