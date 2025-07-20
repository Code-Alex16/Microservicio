import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { ActivatedRoute, Router } from '@angular/router'; // Para obtener parámetros de ruta y navegar
import { ContactosService, Contacto } from '../../services/contactos';
import { CategoriasService, Categoria } from '../../services/categorias'; // Necesario para categorías

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactos-form.html', // Asegúrate de que el nombre del archivo es correcto: contacto-form.html
  styleUrl: './contactos-form.scss' // Asegúrate de que el nombre del archivo es correcto: contacto-form.scss
})
  
export class ContactoFormComponent implements OnInit {
  contacto: Contacto = {
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    id_categoria: undefined // Inicialmente undefined para que el select sea opcional
  };
  categorias: Categoria[] = []; // Para la lista de categorías
  isEditing = false;
  message: string | null = null;

  constructor(
    private contactosService: ContactosService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    public router: Router // <--- ¡CAMBIA 'private' a 'public' aquí!
  ) { }

  ngOnInit(): void {
    this.loadCategorias(); // Cargar categorías al iniciar el formulario

    // Comprobar si estamos en modo edición (si hay un ID en la URL)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.loadContacto(Number(id));
      }
    });
  }

loadCategorias(): void {
  this.categoriasService.getCategorias().subscribe({
    next: (data: any) => {
      // Based on your network response, the categories array is inside 'body'
      if (data && Array.isArray(data.body)) {
        this.categorias = data.body; // <--- THIS IS THE CORRECTED LINE
      } else {
        // Fallback for unexpected response structures
        console.warn('La respuesta de categorías no tiene la estructura esperada (sin .body):', data);
        if (Array.isArray(data)) {
          this.categorias = data; // If, by any chance, the backend sends a direct array
        } else {
          this.categorias = []; // Ensure it's an empty array to prevent errors
        }
      }
    },
    error: (err) => {
      console.error('Error al cargar categorías:', err);
      this.message = 'Error al cargar las categorías. Podrás añadir un contacto sin categoría.';
    }
  });
}


  loadContacto(id: number): void {
    this.contactosService.getContacto(id).subscribe({
      next: (response: any) => { // Cambiado a 'response' para claridad
        // Asume que el backend devuelve { error: false, status: 200, body: {...} }
        if (response && response.body) { // Verifica que 'body' exista
          this.contacto = response.body; // <--- CAMBIO CLAVE AQUÍ: Accede a la propiedad 'body'
          // Asegúrate de que id_categoria se seleccione correctamente si existe
          if (this.contacto.id_categoria === null) {
            this.contacto.id_categoria = undefined; // Para que el select muestre "Seleccionar Categoría (Opcional)"
          }
          this.message = null;
        } else {
          console.warn('La respuesta del contacto no tiene el formato esperado (sin .body):', response);
          this.message = 'Error al procesar los datos del contacto o contacto no encontrado.';
          this.router.navigate(['/contactos']);
        }
      },
      error: (err) => {
        console.error('Error al obtener contacto:', err);
        this.message = err.error?.message || 'Contacto no encontrado.';
        this.router.navigate(['/contactos']);
      }
    });
  }

  onSubmit(): void {
    if (!this.contacto.nombre || !this.contacto.telefono) {
      this.message = 'El nombre y el teléfono son campos requeridos.';
      return;
    }

    if (this.isEditing) {
      // Si estamos editando, llamamos a updateContacto
      this.contactosService.updateContacto(this.contacto.id_contacto!, this.contacto).subscribe({
        next: () => {
          this.message = 'Contacto actualizado exitosamente.';
          this.router.navigate(['/contactos']); // Volver a la lista
        },
        error: (err) => {
          console.error('Error al actualizar contacto:', err);
          this.message = err.error?.mensaje || 'Error al actualizar el contacto.';
        }
      });
    } else {
      // Si no estamos editando, llamamos a createContacto
      this.contactosService.createContacto(this.contacto).subscribe({
        next: () => {
          this.message = 'Contacto creado exitosamente.';
          this.router.navigate(['/contactos']); // Volver a la lista
        },
        error: (err) => {
          console.error('Error al crear contacto:', err);
          this.message = err.error?.mensaje || 'Error al crear el contacto.';
        }
      });
    }
  }
}