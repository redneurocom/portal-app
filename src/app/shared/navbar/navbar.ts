import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html'
})
export class Navbar {
  constructor(private authService: AuthService, private router: Router) {}

  get usuario(): Usuario | null {
    return this.authService.obtenerUsuario();
  }

  get esAdmin(): boolean {
    return this.authService.esAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
