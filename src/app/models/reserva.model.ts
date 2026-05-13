export interface Reserva {
  id: number;
  usuario_id: number;
  espacio_id: number;
  fecha: string;
  hora: string;
  estado: string;
  estado_pago: string;
  fecha_creacion: string;
  nombre_espacio?: string;
  nombre_usuario?: string;
  es_pago?: boolean;
}
