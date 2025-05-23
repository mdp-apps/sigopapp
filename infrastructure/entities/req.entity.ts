export interface ActiveReq {
  loadNumber: number;
}

export interface CurrentStatusReq {
  status: number;
}

export interface DriverReq {
  carrierName: string;
  customerAbbr: string;
  date: string;
  formatType: number;
  internalCode: number;
  maxHour: string;
  minHour: string;
  nameReq: string;
  observation: string;
  reqType: number;
  rutDriver: string;
  status: number;
  turn: number;
  vehiclePatent: string;
}

export interface LogStatusReq {
  id: number;
  description: string;
  eventDate: string;
  fullUserName: string;
  reqStatusName: string;
  userCode: number;
}

export interface Req {
  carrierName: string;
  customerAbbr: string;
  customer: string;
  customerCode: number;
  date: string;
  description: string;
  driverName: string;
  formatType: number;
  hasPallet: boolean;
  name: string;
  nameReqFormat: string;
  observation: string;
  patent: string;
  plantName: string;
  reqCode: number;
  reqType: number;
  rutDriver: string;
  status: number;
  statusName: string;
  turn: number;
  vehiclePatent: string;
  warehouseName: string;
}

export interface StatusReq extends TypeReq {}

export interface TypeReq {
  code: number;
  name: string;
}
