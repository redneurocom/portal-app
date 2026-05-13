import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio.model';

@Injectable({ providedIn: 'root' })
export class EspaciosService {
  private apiUrl = 'http://localhost:3000/api/espacios';

  constructor(private http: HttpClient) {}

  listar(): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.apiUrl);
  }

  obtener(id: number): Observable<Espacio> {
    return this.http.get<Espacio>(`${this.apiUrl}/${id}`);
  }

  crear(espacio: Partial<Espacio>): Observable<any> {
    return this.http.post(this.apiUrl, espacio);
  }

  actualizar(id: number, espacio: Partial<Espacio>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, espacio);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
