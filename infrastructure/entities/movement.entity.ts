export interface InternalMovement {
  result: InternalMov[];
  turnTotals: TotalInternalMov;
}

export interface InternalMov {
  pendingQuantityKG: number;
  productName: string;
  totalQuantityKG: number;
  transferredQuantityKG: number;
  details: InternalMovDetail[];
}

export interface InternalMovDetail {
  customerName: string;
  operationDestinyName: string;
  operationName: string;
  pendingQuantityKG: number;
  totalQuantityKG: number;
  transferredQuantityKG: number;
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
