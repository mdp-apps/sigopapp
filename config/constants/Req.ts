import { Colors } from "./Colors";

export const REQ_FORMAT = {
  granel: 1,
  envasado: 2,
  sacos: 3,
  envasadoApelcha: 4,
  pallet: 5,
  microelementos: 6,
  barrido: 7,
  etelvina: 8,
}

export const REQ_STATUS = {
  anulado: 0,
  creado: 1,
  liberado: 2, 
  pendiente: 3,
  porEjecutar: 4, 
  ejecucion: 5,
  cerrado: 6,
  confirmado: 7,
  finalizado: 8,
};

export const REQ_STATUS_BG_COLOR = {
  [REQ_STATUS.anulado]: Colors.light.pink,
  [REQ_STATUS.creado]: Colors.light.lightWhite,
  [REQ_STATUS.liberado]: Colors.light.lightWhite,
  [REQ_STATUS.pendiente]: Colors.light.gray,
  [REQ_STATUS.porEjecutar]: Colors.light.gray,
  [REQ_STATUS.ejecucion]: Colors.light.yellow,
  [REQ_STATUS.cerrado]: Colors.light.yellow,
  [REQ_STATUS.confirmado]: Colors.light.lightGreen,
  [REQ_STATUS.finalizado]: Colors.light.green,
};

export const REQ_TYPE = {
  despacho: 1,
  recepcion: 2,
  trasladoInterno: 3,
  produccion: 4,
};

export const REQ_TYPE_FORMAT = {
  despachoEnvasado: Number(`${REQ_TYPE.despacho}${REQ_FORMAT.envasado}`),
};

