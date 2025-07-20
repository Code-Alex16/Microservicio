import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterLink } from '@angular/router'; // Importa Router y RouterLink
import { AuthService } from './services/auth'; // Importa tu AuthService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // Añade RouterLink
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'agenda-contactos-frontend';

  // Inyecta AuthService y Router
  constructor(public authService: AuthService, private router: Router) {} // Haz authService público para el template

  logout(): void {
    this.authService.removeToken(); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  }
}