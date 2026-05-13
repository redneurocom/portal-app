import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AvisosService } from '../../services/avisos.service';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-avisos',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './avisos.html'
})
export class Avisos implements OnInit {
  avisos: Aviso[] = [];
  esAdmin = false;
  mostrarFormulario = false;
  avisoEditando: Aviso | null = null;
  formulario: FormGroup;
  mensaje = '';
  error = '';

  constructor(
    private avisosService: AvisosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin();
    this.cargarAvisos();
  }

  cargarAvisos(): void {
    this.avisosService.listar().subscribe({
      next: (data) => {
        this.avisos = data;
      },
      error: () => {
        this.error = 'Error al cargar avisos.';
      }
    });
  }

  abrirFormularioNuevo(): void {
    this.avisoEditando = null;
    this.formulario.reset({ fecha: new Date().toISOString().split('T')[0] });
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  editarAviso(aviso: Aviso): void {
    this.avisoEditando = aviso;
    this.formulario.patchValue(aviso);
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.avisoEditando = null;
  }

  guardarAviso(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datos = this.formulario.value;

    if (this.avisoEditando) {
      this.avisosService.actualizar(this.avisoEditando.id, datos).subscribe({
        next: () => {
          this.mensaje = 'Aviso actualizado correctamente.';
          this.mostrarFormulario = false;
          this.cargarAvisos();
        },
        error: () => {
          this.error = 'Error al actualizar el aviso.';
        }
      });
    } else {
      this.avisosService.crear(datos).subscribe({
        next: () => {
          this.mensaje = 'Aviso publicado correctamente.';
          this.mostrarFormulario = false;
          this.cargarAvisos();
        },
        error: () => {
          this.error = 'Error al publicar el aviso.';
        }
      });
    }
  }

  eliminarAviso(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este aviso?')) return;
    this.avisosService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Aviso eliminado correctamente.';
        this.cargarAvisos();
      },
      error: () => {
        this.error = 'Error al eliminar el aviso.';
      }
    });
  }
}
