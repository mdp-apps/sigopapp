import { HttpAdapter } from "@/config/adapters";

import { ObservationMapper, ResultMapper } from "@/infrastructure/mappers";
import { ApiResponse, Result } from "@/infrastructure/interfaces";
import { ObservationReq } from "@/infrastructure/entities";
import { ObservationReqResponse } from "../interfaces";

interface ObservationBody {
  accion: "Insertar observacion requerimiento";
  cod_req: number;
  comentario: string;
  usuario: number;
}

export const createReqObservationUseCase = async (
  fetcher: HttpAdapter,
  body: ObservationBody
): Promise<ObservationReq> => {
  try {
    const createObservation = await fetcher.post<
      ApiResponse<ObservationReqResponse>,
      ObservationBody
    >(`/requerimientos/observaciones/insertar`, body);

    return ObservationMapper.fromReqObservationsResultToEntity(
      createObservation.resultado
    );
  } catch (error) {
    throw new Error("Error al crear la observación del requerimiento");
  }
};
