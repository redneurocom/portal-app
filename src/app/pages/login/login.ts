import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html'
})
// Pantalla para ingresar al sistema.
export class Login {
  formulario: FormGroup;
  error = '';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });

    if (this.authService.obtenerUsuario()) {
      this.router.navigate(['/inicio']);
    }
  }

  // Envia las credenciales al backend.
  onLogin(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.error = '';
    const { correo, contrasena } = this.formulario.value;

    this.authService.login(correo, contrasena).subscribe({
      next: (usuario) => {
        this.authService.guardarUsuario(usuario);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al iniciar sesión. Verifique sus datos.';
        this.cargando = false;
      }
    });
  }
}
