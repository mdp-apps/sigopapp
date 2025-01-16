export interface ActiveReqResponse {
  bodega: number;
  codigo_chofer: number;
  codigo_cliente: number;
  codigo_empresa_transportista: number;
  codigo_interno: number;
  codigo_transportista: number;
  codigo_usuario: number;
  codigo_vehiculo: number;
  estado_mdp: number;
  estado_transportista: number;
  estado: number;
  id_operacion: number;
  kg_planificados: number;
  kg_verificados: number;
  numero_carga: number;
  operacion: number;
  planta: number;
  tipo_ci: number;
  tipo_formato: number;
  tipo_requerimiento: number;
  turno: number;
}

export interface DriverReqResponse extends ActiveReqResponse {
  abreviacion_cliente: string;
  fecha: string;
  hora_maxima: string;
  hora_minima: string;
  nombre_chofer: string;
  nombre_requerimiento_formato: string;
  nombre_transportista: string;
  nombre_usuario: string;
  observacion: string;
  patente_vehiculo: string;
  rut_chofer: string;
}

export interface ReqResponse extends DriverReqResponse {
  cliente: string;
  descripcion: string;
  estado_nombre: string;
  nombre: string;
  patente: string;
}
export interface LogStatusReqResponse {
  codigo_cliente: number;
  codigo_estado_requerimiento: number;
  codigo_requerimiento: number;
  codigo_usuario: number;
  descripcion: string;
  fecha_evento: string;
  id: number;
  nombre_completo_usuario: string;
  nombre_estado_requerimiento: string;
}



export interface StatusReqResponse extends TypeReqResponse {}
export interface TypeReqResponse {
  bool2: boolean;
  int2: number;
  codigo: number;
  int1: number;
  int4: number;
  int3: number;
  int5: number;
  nombre: string;
  bool1: boolean;
}

