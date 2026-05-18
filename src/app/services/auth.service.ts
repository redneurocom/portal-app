import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { obtenerApiBase } from './api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = obtenerApiBase();

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/auth/login`, { correo, contrasena });
  }

  guardarUsuario(usuario: Usuario): void {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  obtenerUsuario(): Usuario | null {
    const data = localStorage.getItem('usuarioActual');
    return data ? JSON.parse(data) : null;
  }

  esAdmin(): boolean {
    return this.obtenerUsuario()?.rol === 'admin';
  }

  logout(): void {
    localStorage.removeItem('usuarioActual');
  }
}
