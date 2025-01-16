export interface Result {
  result: string;
};


export interface ApiResponse<T> {
  resultado: T;
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


