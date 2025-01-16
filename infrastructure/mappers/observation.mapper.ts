import { ObservationReqResponse } from "@/core/req/interfaces";
import { ObservationReq } from "../entities";

export class ObservationMapper{
  static fromReqObservationsResultToEntity(result: ObservationReqResponse): ObservationReq { 

    return {
      app: result.app,
      comment: result.comentario,
      dateComment: result.fecha_comentario,
      observationId: result.id_observacion,
      path: result.ruta,
      reqCode: result.codigo_requerimiento,
      tokenCode: result.ficha,
      userComment: result.usuario_comentario,
    }
  }
}