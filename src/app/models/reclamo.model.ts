export interface Reclamo {
  id: number;
  usuario_id: number;
  categoria: string;
  descripcion: string;
  estado: string;
  respuesta: string;
  fecha_creacion: string;
  nombre_usuario?: string;
}
