import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReclamosService } from '../../services/reclamos.service';
import { Reclamo } from '../../models/reclamo.model';

@Component({
  selector: 'app-reclamos',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './reclamos.html'
})
// Pantalla para registrar y responder reclamos.
export class Reclamos implements OnInit {
  reclamos: Reclamo[] = [];
  esAdmin = false;
  formulario: FormGroup;
  formularioAdmin: FormGroup;
  reclamoSeleccionado: Reclamo | null = null;
  mensaje = '';
  error = '';

  categorias = ['Ruido', 'Limpieza', 'Infraestructura', 'Seguridad', 'Servicios', 'Otro'];

  constructor(
    private reclamosService: ReclamosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.formularioAdmin = this.fb.group({
      estado: ['', Validators.required],
      respuesta: ['']
    });
  }

  // Define el rol y carga reclamos.
  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin();
    this.cargarReclamos();
  }

  // Carga todos los reclamos o solo los del usuario.
  cargarReclamos(): void {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) return;

    if (this.esAdmin) {
      this.reclamosService.listarTodos().subscribe({
        next: (data) => {
          this.reclamos = data;
        },
        error: () => {
          this.error = 'Error al cargar reclamos.';
        }
      });
    } else {
      this.reclamosService.listarPorUsuario(usuario.id).subscribe({
        next: (data) => {
          this.reclamos = data;
        },
        error: () => {
          this.error = 'Error al cargar tus reclamos.';
        }
      });
    }
  }

  // Envia un reclamo nuevo.
  enviarReclamo(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const usuario = this.authService.obtenerUsuario()!;
    const datos = {
      usuario_id: usuario.id,
      ...this.formulario.value
    };

    this.reclamosService.crear(datos).subscribe({
      next: () => {
        this.mensaje = 'Reclamo registrado correctamente. El administrador lo revisará pronto.';
        this.formulario.reset();
        this.cargarReclamos();
      },
      error: () => {
        this.error = 'Error al registrar el reclamo.';
      }
    });
  }

  // Selecciona un reclamo para responder.
  seleccionarReclamo(reclamo: Reclamo): void {
    this.reclamoSeleccionado = reclamo;
    this.formularioAdmin.patchValue({
      estado: reclamo.estado,
      respuesta: reclamo.respuesta || ''
    });
    this.mensaje = '';
    this.error = '';
  }

  // Cancela la respuesta del administrador.
  cancelarRespuesta(): void {
    this.reclamoSeleccionado = null;
  }

  // Guarda estado y respuesta del reclamo.
  guardarRespuesta(): void {
    if (this.formularioAdmin.invalid) {
      this.formularioAdmin.markAllAsTouched();
      return;
    }
    this.reclamosService.actualizar(this.reclamoSeleccionado!.id, this.formularioAdmin.value).subscribe({
      next: () => {
        this.mensaje = 'Reclamo actualizado correctamente.';
        this.reclamoSeleccionado = null;
        this.cargarReclamos();
      },
      error: () => {
        this.error = 'Error al actualizar el reclamo.';
      }
    });
  }

  // Devuelve el color visual del estado.
  badgeEstado(estado: string): string {
    const mapa: Record<string, string> = {
      pendiente: 'bg-warning text-dark',
      en_proceso: 'bg-info text-dark',
      resuelto: 'bg-success'
    };
    return mapa[estado] || 'bg-secondary';
  }
}
