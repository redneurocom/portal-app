import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';

@Injectable({ providedIn: 'root' })
export class ReclamosService {
  private apiUrl = 'http://localhost:3000/api/reclamos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(this.apiUrl);
  }

  listarPorUsuario(usuarioId: number): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  crear(reclamo: { usuario_id: number; categoria: string; descripcion: string }): Observable<any> {
    return this.http.post(this.apiUrl, reclamo);
  }

  actualizar(id: number, datos: { estado: string; respuesta: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }
}
