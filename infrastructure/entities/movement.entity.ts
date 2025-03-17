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
  pendingQuantityKG: number;
  plannedDate: string;
  productName: string;
  status: number;
  statusName: string;
  totalQuantityKG: number;
  turn: number;
  verifiedQuantityKG: number;
  warehouseDestinyName: string;
  warehouseName: string;
}

export interface StatusInternalMov extends TypeInternalMov { }

export interface TypeInternalMov {
  code: number;
  name: string;
}
