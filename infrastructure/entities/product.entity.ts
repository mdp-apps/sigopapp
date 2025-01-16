export interface Product {
  code: number;
  name: string;
  customerCode: string;
}

export interface ProductReq {
  abbrPlant: string;
  abbrWarehouse: string;
  ballotCode: number;
  batch: number;
  codeDetailReq: number;
  codeDI: number;
  mixCode: string;
  codeProduct: string;
  codeReq: number;
  componentType: string;
  customerCode: number;
  kgProduct: number;
  mixName: string;
  observation: string;
  operationCode: number;
  operationName: string;
  productName: string;
  quantity: number;
}
