import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aviso } from '../models/aviso.model';

@Injectable({ providedIn: 'root' })
export class AvisosService {
  private apiUrl = 'http://localhost:3000/api/avisos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Aviso[]> {
    return this.http.get<Aviso[]>(this.apiUrl);
  }

  crear(aviso: Partial<Aviso>): Observable<any> {
    return this.http.post(this.apiUrl, aviso);
  }

  actualizar(id: number, aviso: Partial<Aviso>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, aviso);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
