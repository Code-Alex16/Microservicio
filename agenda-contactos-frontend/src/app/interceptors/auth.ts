import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth'; // Importa tu servicio de autenticación

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación

  const token = authService.getToken(); // Obtiene el token del localStorage

  // Si hay un token, clona la solicitud y añade la cabecera de autorización
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned); // Continúa con la solicitud modificada
  }

  // Si no hay token, continúa con la solicitud original
  return next(req);
};