export interface InternalMovement {
  cashing: number;
  customerName: string;
  dapiCode: number;
  detailId: number;
  diCode: string;
  id: number;
  movementTypeName: string;
  observation: string;
  operationCode: number;
  operationDestinyCode: number;
  operationDestinyName: string;
  operationName: string;
  plannedDate: string;
  productName: string;
  status: number;
  totalQuantity: number;
  turn: number;
  verifiedQuantity: number;
  warehouseDestinyName: string;
  warehouseName: string;
}

export interface StatusInternalMov extends TypeInternalMov { }

export interface TypeInternalMov {
  code: number;
  name: string;
}
