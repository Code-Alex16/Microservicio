import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms'; // Necesario para ngModel (formularios de plantilla)
import { AuthService } from '../../services/auth'; // Importa tu servicio de autenticación
import { Router, RouterLink } from '@angular/router'; // Para navegar después del registro

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Importa módulos necesarios
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  username = '';
  password = '';
  message = ''; // Para mostrar mensajes al usuario

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    if (!this.username || !this.password) {
      this.message = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.register({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.message = res.mensaje || 'Registro exitoso. ¡Ahora puedes iniciar sesión!';
          // Puedes redirigir al usuario a la página de login después de un registro exitoso
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error de registro:', err);
          this.message = err.error?.mensaje || 'Error al registrar usuario.';
        }
      });
  }
}