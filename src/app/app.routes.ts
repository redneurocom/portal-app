import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio)
  },
  {
    path: 'espacios',
    loadComponent: () => import('./pages/espacios/espacios').then(m => m.Espacios)
  },
  {
    path: 'espacios/:id',
    loadComponent: () => import('./pages/espacio-detalle/espacio-detalle').then(m => m.EspacioDetalle)
  },
  {
    path: 'reservas',
    loadComponent: () => import('./pages/reservas/reservas').then(m => m.Reservas)
  },
  {
    path: 'avisos',
    loadComponent: () => import('./pages/avisos/avisos').then(m => m.Avisos)
  },
  {
    path: 'reclamos',
    loadComponent: () => import('./pages/reclamos/reclamos').then(m => m.Reclamos)
  },
  { path: '**', redirectTo: 'login' }
];
