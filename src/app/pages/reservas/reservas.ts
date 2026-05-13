import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReservasService } from '../../services/reservas.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-reservas',
  imports: [DatePipe, RouterLink],
  templateUrl: './reservas.html'
})
export class Reservas implements OnInit {
  reservas: Reserva[] = [];
  esAdmin = false;
  mensaje = '';
  error = '';

  constructor(
    private authService: AuthService,
    private reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin();
    this.cargarReservas();
  }

  cargarReservas(): void {
    const usuario = this.authService.obtenerUsuario();
    if (!usuario) return;

    if (this.esAdmin) {
      this.reservasService.listarTodas().subscribe({
        next: (data) => {
          this.reservas = data;
        },
        error: () => {
          this.error = 'Error al cargar reservas.';
        }
      });
    } else {
      this.reservasService.listarPorUsuario(usuario.id).subscribe({
        next: (data) => {
          this.reservas = data;
        },
        error: () => {
          this.error = 'Error al cargar tus reservas.';
        }
      });
    }
  }

  cancelarReserva(id: number): void {
    if (!confirm('¿Estás seguro de cancelar esta reserva?')) return;
    this.reservasService.cancelar(id).subscribe({
      next: () => {
        this.mensaje = 'Reserva cancelada correctamente.';
        this.cargarReservas();
      },
      error: () => {
        this.error = 'Error al cancelar la reserva.';
      }
    });
  }

  badgeEstado(estado: string): string {
    const mapa: Record<string, string> = {
      confirmada: 'bg-success',
      cancelada: 'bg-danger',
      pendiente: 'bg-warning text-dark'
    };
    return mapa[estado] || 'bg-secondary';
  }

  badgePago(estadoPago: string): string {
    const mapa: Record<string, string> = {
      pagado: 'bg-success',
      pendiente: 'bg-warning text-dark',
      no_aplica: 'bg-secondary'
    };
    return mapa[estadoPago] || 'bg-secondary';
  }
}
