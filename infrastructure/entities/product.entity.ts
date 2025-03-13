export interface Product {
  code: number;
  name: string;
  customerCode: string;
}

export interface ProductMix {
  id: string;
  batch: number;
  codeDetailReq: number;
  formattedTotalKg: string;
  mixCode: string;
  mixName: string;
  packagingName: string;
  productCode: string;
  totalKg: number;
  totalPackagingQuantity: number;
};

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
