import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngFor, ngIf
import { RouterLink, Router } from '@angular/router'; // Para navegación
import { ContactosService, Contacto } from '../../services/contactos'; // Asegúrate de .service
import { AuthService } from '../../services/auth'; // Importa AuthService

@Component({
  selector: 'app-contactos-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink para el botón de "Nuevo Contacto"
  templateUrl: './contactos-list.html', // Asegúrate de que el nombre del archivo es correcto
  styleUrl: './contactos-list.scss' // Asegúrate de que el nombre del archivo es correcto
})
export class ContactosListComponent implements OnInit {
  contactos: Contacto[] = [];
  message: string | null = null; // Para mensajes de éxito o error

  // Inyecta AuthService en el constructor
  constructor(
    private contactosService: ContactosService,
    private router: Router,
    private authService: AuthService // Inyecta AuthService
  ) { }

  ngOnInit(): void {
    this.getContactos(); // Carga los contactos al inicializar el componente
  }

  getContactos(): void {
    this.contactosService.getContactos().subscribe({
      next: (response: any) => { // Cambia 'data' a 'response' para mayor claridad y tipado 'any'
        // ¡CAMBIO CLAVE AQUÍ! Accede a la propiedad 'body'
        if (response && Array.isArray(response.body)) {
          this.contactos = response.body; // Asigna el array de contactos desde 'body'
          if (this.contactos.length === 0) {
            this.message = 'No tienes contactos aún. ¡Añade uno!';
          } else {
            this.message = null; // Limpiar mensaje si hay contactos
          }
        } else {
          // Esto se ejecuta si la respuesta no tiene el formato esperado (ej. no hay 'body' o no es un array)
          console.warn('La respuesta de contactos no tiene el formato esperado (sin .body):', response);
          this.message = 'Error al procesar los contactos o no hay contactos en el formato esperado.';
          this.contactos = []; // Asegura que la lista sea un array vacío
        }
      },
      error: (err) => {
        console.error('Error al obtener contactos:', err);
        // Si el token expira o es inválido, redirigir al login
        if (err.status === 401 || err.status === 403) {
          this.message = 'Error al cargar los contactos. Asegúrate de estar logueado.';
          this.authService.removeToken(); // Limpia el token si hay un error de autenticación/autorización
          this.router.navigate(['/login']);
        } else {
          this.message = err.error?.message || 'Error al cargar los contactos.'; // Usa .message consistentemente
        }
        this.contactos = []; // Asegura que la lista esté vacía en caso de error
      }
    });
  }

  deleteContacto(id: number | undefined): void {
    if (id === undefined) {
      this.message = 'ID de contacto no definido.';
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      this.contactosService.deleteContacto(id).subscribe({
        next: () => {
          this.message = 'Contacto eliminado exitosamente.';
          this.getContactos(); // Refresca la lista de contactos
        },
        error: (err) => {
          console.error('Error al eliminar contacto:', err);
          this.message = err.error?.message || 'Error al eliminar el contacto.'; // Usa .message consistentemente
        }
      });
    }
  }

  editContacto(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/contactos/editar', id]);
    }
  }
}