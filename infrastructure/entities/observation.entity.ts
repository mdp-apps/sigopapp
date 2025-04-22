export interface ObservationReq {
  comment: string;
  dateComment: string;
  observationId: number;
  reqCode: number;
  urlImg: string;
  userComment: string;
}

export interface ObservationImage{
  imageUrl: string;
}