export interface ObservationReq {
  comment: string;
  dateComment: string;
  observationId: number;
  reqCode: number;
  userComment: string;
}

export interface ObservationImage{
  imageUrl: string;
}