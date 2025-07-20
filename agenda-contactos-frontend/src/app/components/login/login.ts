import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.message = 'Por favor, ingresa tu usuario y contraseña.';
      return;
    }

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.message = 'Inicio de sesión exitoso.';
          this.authService.setToken(res.token); // Guarda el token
          console.log('Login exitoso, intentando redirigir a /contactos...');
          // Redirige al usuario a una página principal de la aplicación (ej. contactos)
          this.router.navigate(['/contactos']);
          console.log('Redirección solicitada.'); // Añade este otro log
        },
        error: (err) => {
          console.error('Error de inicio de sesión:', err);
          this.message = err.error?.mensaje || 'Credenciales inválidas.';
        }
      });
  }
}