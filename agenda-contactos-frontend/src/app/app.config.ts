import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { ContactosListComponent } from './components/contactos-list/contactos-list'; // Importa
import { ContactoFormComponent } from './components/contactos-form/contactos-form';   // Importa

import { authInterceptor } from './interceptors/auth';
import { AuthGuard } from './guards/auth-guard'; // Vamos a crear este en el siguiente paso

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Rutas protegidas para contactos
  { path: 'contactos', component: ContactosListComponent, canActivate: [AuthGuard] }, // Proteger con AuthGuard
  { path: 'contactos/nuevo', component: ContactoFormComponent, canActivate: [AuthGuard] },
  { path: 'contactos/editar/:id', component: ContactoFormComponent, canActivate: [AuthGuard] },
  // Añadiremos más rutas aquí
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
    // El AuthGuard no necesita ser un provider aquí porque es un Functional Guard
  ]
};