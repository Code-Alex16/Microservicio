import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Tu API Gateway para usuarios

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Métodos para manejar el token JWT
  setToken(token: string): void {
    localStorage.setItem('jwt_token', token); // Almacenar el token en localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  removeToken(): void {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verifica si hay un token almacenado
  }
}
