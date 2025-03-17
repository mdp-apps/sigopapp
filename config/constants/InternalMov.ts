import { Colors } from "./Colors";

export const INTERNAL_MOV_STATUS = {
  borrador: 1,
  creado: 2,
  planificado: 3, 
  pAdicional: 4,
  enCurso: 5, 
  cerrado: 6,
  finalizado: 7,
};

export const INTERNAL_MOV_STATUS_BG_COLOR = {
  [INTERNAL_MOV_STATUS.borrador]: Colors.light.pink,
  [INTERNAL_MOV_STATUS.creado]: Colors.light.lightWhite,
  [INTERNAL_MOV_STATUS.planificado]: Colors.light.gray,
  [INTERNAL_MOV_STATUS.pAdicional]: Colors.light.gray,
  [INTERNAL_MOV_STATUS.enCurso]: Colors.light.green,
  [INTERNAL_MOV_STATUS.cerrado]: Colors.light.yellow,
  [INTERNAL_MOV_STATUS.finalizado]: Colors.light.gray,
};