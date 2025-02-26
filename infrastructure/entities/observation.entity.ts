export interface ObservationReq {
  app: string;
  comment: string;
  dateComment: string;
  observationId: number;
  path: string;
  reqCode: number;
  tokenCode: number;
  userComment: string;
}

export interface ObservationImage{
  imageUrl: string;
  base64Str: string;
}