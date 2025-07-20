import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define una interfaz para Contacto para tipado seguro
export interface Contacto {
  id_contacto?: number; // Opcional porque no existe al crear uno nuevo
  nombre: string;
  apellido?: string;
  telefono: string;
  correo?: string;
  id_categoria?: number; // Opcional, si no todos los contactos tienen categoría
  id_usuario?: number; // Lo maneja el backend, no lo enviamos desde el frontend
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private apiUrl = 'http://localhost:3000/api/contactos'; // Tu API Gateway para contactos

  constructor(private http: HttpClient) { }

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${this.apiUrl}/contactos`);
  }

  getContacto(id: number): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}/contactos/${id}`);
  }

  createContacto(contacto: Contacto): Observable<Contacto> {
    // Asegúrate de que los campos opcionales que no se envían si están vacíos no causen problemas
    const dataToSend = {
      nombre: contacto.nombre,
      apellido: contacto.apellido || null, // Envía null si está vacío
      telefono: contacto.telefono,
      correo: contacto.correo || null,
      id_categoria: contacto.id_categoria || null // Envía null si está vacío o no seleccionado
    };
    return this.http.post<Contacto>(`${this.apiUrl}/contactos`, dataToSend);
  }

  updateContacto(id: number, contacto: Contacto): Observable<Contacto> {
    const dataToSend = {
      nombre: contacto.nombre,
      apellido: contacto.apellido || null,
      telefono: contacto.telefono,
      correo: contacto.correo || null,
      id_categoria: contacto.id_categoria || null
    };
    return this.http.put<Contacto>(`${this.apiUrl}/contactos/${id}`, dataToSend);
  }

  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contactos/${id}`);
  }
}