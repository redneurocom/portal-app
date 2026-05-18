import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
// Componente principal que muestra navbar y paginas.
export class App {
  constructor(private authService: AuthService) {}

  // Indica si se debe mostrar la navegacion.
  get estaLogueado(): boolean {
    return this.authService.obtenerUsuario() !== null;
  }
}
