import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EspaciosService } from '../../services/espacios.service';
import { ReservasService } from '../../services/reservas.service';
import { Espacio } from '../../models/espacio.model';

@Component({
  selector: 'app-espacio-detalle',
  imports: [ReactiveFormsModule],
  templateUrl: './espacio-detalle.html'
})
export class EspacioDetalle implements OnInit {
  espacio: Espacio | null = null;
  formulario: FormGroup;
  mensaje = '';
  error = '';
  cargando = false;

  horas = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  normasUso = [
    'Respetar el horario reservado.',
    'Dejar el espacio limpio y ordenado.',
    'No ingresar con alimentos no permitidos.',
    'Respetar la capacidad máxima indicada.',
    'Reportar cualquier daño al administrador.'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private espaciosService: EspaciosService,
    private reservasService: ReservasService,
    private authService: AuthService
  ) {
    this.formulario = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.espaciosService.obtener(id).subscribe({
      next: (data) => {
        this.espacio = data;
      },
      error: () => this.router.navigate(['/espacios'])
    });
  }

  get fechaMinima(): string {
    return new Date().toISOString().split('T')[0];
  }

  reservar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargando = true;
    this.mensaje = '';
    this.error = '';

    const datos = {
      usuario_id: usuario.id,
      espacio_id: this.espacio!.id,
      fecha: this.formulario.value.fecha,
      hora: this.formulario.value.hora
    };

    this.reservasService.crear(datos).subscribe({
      next: () => {
        this.mensaje = '¡Reserva creada exitosamente! Puedes verla en Mis Reservas.';
        this.formulario.reset();
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al crear la reserva. Intenta con otra fecha u hora.';
        this.cargando = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/espacios']);
  }
}
