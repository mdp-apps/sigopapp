export interface InternalMovementResponse {
  cantidad_dapi: number;
  cantidad_di: number;
  cantidad_total: number;
  cantidad_verificada: number;
  cobro: number;
  codigo_bodega_destino: number;
  codigo_bodega: number;
  codigo_cliente: number;
  codigo_dapi: number;
  codigo_di: string;
  codigo_operacion_destino: number;
  codigo_operacion: number;
  codigo_papeleta: number;
  codigo_producto: string;
  codigo_usuario: number;
  copiada: number;
  estado: number;
  fecha_creacion: string;
  fecha_planificada: string;
  id_dapi: number;
  id_detalle: number;
  id_di: number;
  id_operacion_destino: number;
  id_operacion: number;
  id: number;
  nombre_bodega_destino: string;
  nombre_bodega: string;
  nombre_cliente: string;
  nombre_estado: string;
  nombre_operacion_destino: string;
  nombre_operacion: string;
  nombre_producto: string;
  nombre_tipo_movimiento: string;
  nombre_turno: string;
  observacion: string;
  porcentaje_cumplimiento: number;
  tiene_pallet: number;
  tipo_movimiento: number;
  turno: number;
}

export interface StatusInternalMovResponse extends TypeInternalMovResponse { }

export interface TypeInternalMovResponse {
  bool2: boolean;
  int2: number;
  codigo: number;
  int1: number;
  int4: number;
  int3: number;
  string1: string;
  int5: number;
  nombre: string;
  bool1: boolean;
}

