import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html'
})
// Barra superior con menu segun el usuario.
export class Navbar {
  constructor(private authService: AuthService, private router: Router) {}

  // Obtiene el usuario guardado en sesion local.
  get usuario(): Usuario | null {
    return this.authService.obtenerUsuario();
  }

  // Permite mostrar opciones solo para administrador.
  get esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  // Cierra sesion y vuelve al login.
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
