export interface ProductResponse {
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

export interface ProductReqResponse {
  abreviacion_bodega: string;
  abreviacion_planta: string;
  abreviacion_umed: string;
  cantidad_asociada: number;
  cantidad: number;
  codigo_bodega: number;
  codigo_cliente: number;
  codigo_di: number;
  codigo_detalle_requerimiento: number;
  codigo_mezcla: string;
  codigo_operacion: number;
  codigo_papeleta: number;
  codigo_planta: number;
  codigo_producto: string;
  codigo_requerimiento: number;
  codigo_turno: number;
  codigo_umed: number;
  copiada: number;
  fecha_real: string;
  id_di: number;
  id_operacion: number;
  kg_pallet: number;
  kg_producto_nominal: number;
  kg_producto_prorrateo: number;
  kg_producto_real: number;
  kg_producto: number;
  kg_x_envase: number;
  lote: number;
  nombre_mezcla: string;
  nombre_operacion: string;
  nombre_producto: string;
  observacion: string;
  peso_real: number;
  tamano_bash: number;
  tipo_componente: string;
}