import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id_categoria: number;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3000/api/categorias'; // Tu API Gateway para categorías

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categoria/${id}`);
  }

  createCategoria(categoriaData: { categoria: string }): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categoria/nueva`, categoriaData);
  }

  updateCategoria(id: number, categoriaData: { categoria: string }): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categorias/${id}`, categoriaData);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorias/${id}`);
  }
}