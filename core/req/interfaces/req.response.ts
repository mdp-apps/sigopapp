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

//! Quitar si no se usará para reemplazar a ReqResponse 
interface NewReq {
  bod_cod: number;
  cho_cod: string;
  cho_rut: string;
  cli_abreviacion: string;
  cli_cod: string;
  emp_cod_transp: string;
  emp_nombre: string;
  esreq_cod: number;
  esreq_nombre: string;
  fre_cod: number;
  fre_nombre: string;
  nombre_chofer: string;
  nombre_usuario: string;
  nove_cod_docto: null;
  nove_cod: null;
  nove_secundaria: null;
  pla_cod: number;
  recli_cod: string;
  recli_fecha_creacion: string;
  recli_fecha: string;
  recli_hora_entrada_maxima_show: string;
  recli_hora_entrada_maxima: string;
  recli_hora_entrada_req_show: string;
  recli_hora_entrada_req: string;
  recli_mdp_completa: number;
  recli_num_carga: string;
  recli_observacion: string;
  recli_tiene_palet: number;
  recli_trans_completa: number;
  suma_productos_kg: string;
  suma_productos_verificado_kg: string;
  tra_cod: string;
  treq_cod: number;
  treq_nombre: string;
  tur_cod: number;
  usu_cod: string;
  usu_email: string;
  veh_cod: string;
  veh_patente: string;
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

