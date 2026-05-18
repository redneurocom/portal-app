import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EspaciosService } from '../../services/espacios.service';
import { ReservasService } from '../../services/reservas.service';
import { AvisosService } from '../../services/avisos.service';
import { ReclamosService } from '../../services/reclamos.service';
import { Usuario } from '../../models/usuario.model';
import { Espacio } from '../../models/espacio.model';
import { Reserva } from '../../models/reserva.model';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, DatePipe],
  templateUrl: './inicio.html'
})
// Pantalla inicial con resumen del portal.
export class Inicio implements OnInit {
  usuario: Usuario | null = null;
  esAdmin = false;
  proximaReserva: Reserva | null = null;
  espaciosDestacados: Espacio[] = [];
  avisosRecientes: Aviso[] = [];
  totalReservas = 0;
  totalEspacios = 0;
  reclamosPendientes = 0;
  error = '';

  constructor(
    private authService: AuthService,
    private espaciosService: EspaciosService,
    private reservasService: ReservasService,
    private avisosService: AvisosService,
    private reclamosService: ReclamosService,
    private router: Router
  ) {}

  // Verifica sesion y carga la informacion inicial.
  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.esAdmin = this.authService.esAdmin();

    this.cargarDatos();
  }

  // Carga los datos principales segun el rol.
  cargarDatos(): void {
    this.error = '';
    this.cargarEspacios();
    this.cargarAvisos();

    if (this.esAdmin) {
      this.cargarEstadisticasAdmin();
    } else {
      this.cargarReservasUsuario();
    }
  }

  // Obtiene espacios para el resumen.
  private cargarEspacios(): void {
    this.espaciosService.listar().subscribe({
      next: (data) => {
        this.espaciosDestacados = data.slice(0, 3);
        this.totalEspacios = data.length;
      },
      error: () => {
        this.error = 'No se pudieron cargar los espacios. Verifica que el backend este corriendo.';
      }
    });
  }

  // Obtiene los avisos recientes.
  private cargarAvisos(): void {
    this.avisosService.listar().subscribe({
      next: (data) => {
        this.avisosRecientes = data.slice(0, 3);
      },
      error: () => {
        this.error = 'No se pudieron cargar los avisos. Verifica que el backend este corriendo.';
      }
    });
  }

  // Busca la proxima reserva del residente.
  private cargarReservasUsuario(): void {
    const hoy = new Date().toISOString().split('T')[0];
    this.reservasService.listarPorUsuario(this.usuario!.id).subscribe({
      next: (data) => {
        const futuras = data.filter(r => r.estado === 'confirmada' && r.fecha >= hoy);
        this.proximaReserva = futuras[0] || null;
      },
      error: () => {
        this.error = 'No se pudieron cargar tus reservas. Verifica que el backend este corriendo.';
      }
    });
  }

  // Calcula totales simples para el administrador.
  private cargarEstadisticasAdmin(): void {
    this.reservasService.listarTodas().subscribe({
      next: (data) => {
        this.totalReservas = data.length;
      },
      error: () => {
        this.error = 'No se pudieron cargar las reservas. Verifica que el backend este corriendo.';
      }
    });
    this.reclamosService.listarTodos().subscribe({
      next: (data) => {
        this.reclamosPendientes = data.filter(r => r.estado === 'pendiente').length;
      },
      error: () => {
        this.error = 'No se pudieron cargar los reclamos. Verifica que el backend este corriendo.';
      }
    });
  }
}
