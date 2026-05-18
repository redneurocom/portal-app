import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { obtenerApiBase } from './api.config';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private apiUrl = `${obtenerApiBase()}/reservas`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  listarPorUsuario(usuarioId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  crear(reserva: { usuario_id: number; espacio_id: number; fecha: string; hora: string }): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }

  cancelar(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {});
  }
}
