export interface InternalMovement {
  result: InternalMov[];
  turnTotals: TotalInternalMov;
}

export interface InternalMov {
  cashing: number;
  customerName: string;
  detailId: number;
  id: number;
  operationCode: number;
  operationDestinyCode: number;
  operationDestinyName: string;
  operationName: string;
  pendingQuantityKG: number;
  productName: string;
  status: number;
  totalQuantityKG: number;
  turn: number;
  transferredQuantityKG: number;
  warehouseDestinyName: string;
  warehouseName: string;
}

export interface TotalInternalMov {
  plannedDate: string;
  pending: string;
  planned: string;
  transferred: string;
  turn: number;
}

export interface StatusInternalMov extends TypeInternalMov { }

export interface TypeInternalMov {
  code: number;
  name: string;
}
