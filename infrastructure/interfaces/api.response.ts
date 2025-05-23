export interface Result {
  [x: string]: string | "OK";
};


export interface ApiResponse<T> {
  error: any;
  resultado: T;
}

export interface ErrorResponse {
  error: string;
}

export interface DropdownResponse { 
  code: string;
  name: string;
}

export interface FilterReqValues {
  req: string;
  customer: string;
  patent: string;
  date: Date;
  turn: string;
  reqStatus: string;
  reqType: string;
  warehouse: string;
  product: string;
  operation: string;
};

export interface FilterMovValues {
  Requerimiento: string;
  Codigo: string;
  "Código detalle": string;
  Cliente: string;
  Patente: string;
  Fecha: Date;
  Turno: string;
  "Estado movimiento interno": string;
  "Tipo movimiento interno": string;
  Bodega: string;
  Producto: string;
  Operacion: string;
};

export interface SectionListResponse{
  title: string;
  data: string[];
}


