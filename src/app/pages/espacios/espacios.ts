import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EspaciosService } from '../../services/espacios.service';
import { Espacio } from '../../models/espacio.model';

@Component({
  selector: 'app-espacios',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './espacios.html'
})
// Pantalla para listar y administrar espacios.
export class Espacios implements OnInit {
  espacios: Espacio[] = [];
  espaciosFiltrados: Espacio[] = [];
  esAdmin = false;
  mostrarFormulario = false;
  espacioEditando: Espacio | null = null;
  formulario: FormGroup;
  mensaje = '';
  error = '';

  constructor(
    private espaciosService: EspaciosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      categoria: ['', Validators.required],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      ubicacion: [''],
      precio: [0],
      es_pago: [false],
      imagen: ['']
    });
  }

  // Carga espacios al entrar a la pantalla.
  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin();
    this.cargarEspacios();
  }

  // Obtiene los espacios desde la API.
  cargarEspacios(): void {
    this.error = '';
    this.espaciosService.listar().subscribe({
      next: (data) => {
        this.espacios = data;
        this.espaciosFiltrados = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los espacios. Verifica que el backend este corriendo.';
      }
    });
  }

  // Filtra espacios por nombre o categoria.
  buscar(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.espaciosFiltrados = this.espacios.filter(e =>
      e.nombre.toLowerCase().includes(valor) || e.categoria.toLowerCase().includes(valor)
    );
  }

  // Abre el formulario para crear espacio.
  abrirFormularioNuevo(): void {
    this.espacioEditando = null;
    this.formulario.reset({ capacidad: 1, precio: 0, es_pago: false });
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  // Carga un espacio en el formulario para editarlo.
  editarEspacio(espacio: Espacio): void {
    this.espacioEditando = espacio;
    this.formulario.patchValue(espacio);
    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';
  }

  // Cierra el formulario sin guardar.
  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.espacioEditando = null;
  }

  // Guarda un espacio nuevo o editado.
  guardarEspacio(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datos = this.formulario.value;

    if (this.espacioEditando) {
      this.espaciosService.actualizar(this.espacioEditando.id, datos).subscribe({
        next: () => {
          this.mensaje = 'Espacio actualizado correctamente.';
          this.mostrarFormulario = false;
          this.cargarEspacios();
        },
        error: () => {
          this.error = 'Error al actualizar el espacio.';
        }
      });
    } else {
      this.espaciosService.crear(datos).subscribe({
        next: () => {
          this.mensaje = 'Espacio creado correctamente.';
          this.mostrarFormulario = false;
          this.cargarEspacios();
        },
        error: () => {
          this.error = 'Error al crear el espacio.';
        }
      });
    }
  }

  // Elimina logicamente un espacio.
  eliminarEspacio(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este espacio?')) return;
    this.espaciosService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Espacio eliminado correctamente.';
        this.cargarEspacios();
      },
      error: () => {
        this.error = 'Error al eliminar el espacio.';
      }
    });
  }
}
