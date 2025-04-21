export interface InternalMovementResponse {
  resultado: InternalMovResponse[];
  totales: TotalInternalMovResponse;
}

export interface InternalMovResponse {
  cantidad_pendiente: number;
  cantidad_total: number;
  cantidad_verificada: number;
  codigo_producto: number;
  fecha_creacion: string;
  nombre_producto: string;
  turno: number;
  detalles: InternalMovDetailResponse[];
}

export interface InternalMovDetailResponse {
  cantidad_pendiente: number;
  cantidad_total: number;
  cantidad_verificada: number;
  codigo_bodega_destino: number;
  codigo_bodega: number;
  codigo_cliente: number;
  codigo_producto: number;
  nombre_bodega_destino: string;
  nombre_bodega: string;
  nombre_cliente: string;
  nombre_operacion_destino: string;
  nombre_operacion: string;
}

export interface TotalInternalMovResponse {
  fecha: string;
  pendiente: number;
  planificado: number;
  trasladado: number;
  turno: number;
}


export interface StatusInternalMovResponse extends TypeInternalMovResponse {}

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
