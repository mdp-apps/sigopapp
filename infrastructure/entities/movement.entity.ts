export interface InternalMovement {
  result: InternalMov[];
  turnTotals: TotalInternalMov;
}

export interface InternalMov {
  pendingQuantityKG: string;
  productCode: number;
  productName: string;
  totalQuantityKG: string;
  transferredQuantityKG: string;
  details: InternalMovDetail[];
}

export interface InternalMovDetail {
  customerName: string;
  operationDestinyName: string;
  operationName: string;
  pendingQuantityKG: string;
  totalQuantityKG: string;
  transferredQuantityKG: string;
  warehouseDestinyName: string;
  warehouseName: string;
}

export interface TotalInternalMov {
  plannedDate: string;
  pending: string;
  planned: string;
  transferred: string;
  turn: string;
}

export interface StatusInternalMov extends TypeInternalMov { }

export interface TypeInternalMov {
  code: number;
  name: string;
}
