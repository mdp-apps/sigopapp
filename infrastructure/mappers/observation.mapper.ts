import { ObservationReqResponse } from "@/core/req/interfaces";
import { ObservationReq } from "../entities";

export class ObservationMapper{
  static fromReqObservationsResultToEntity(result: ObservationReqResponse): ObservationReq { 

    return {
      comment: result.comentario,
      dateComment: result.fecha_comentario,
      observationId: result.id_observacion,
      reqCode: result.codigo_requerimiento,
      userComment: result.usuario_comentario,
    }
  }
}