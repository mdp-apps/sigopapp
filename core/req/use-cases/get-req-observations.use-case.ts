import { HttpAdapter } from "@/config/adapters";

import { ObservationReqResponse } from "../interfaces";
import { ObservationReq } from "@/infrastructure/entities";

import { ApiResponse } from "@/infrastructure/interfaces";
import { ObservationMapper } from "@/infrastructure/mappers";

interface Body {
  accion: "Consultar observaciones requerimiento";
  cod_req: number;
}

export const getReqObservationsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<ObservationReq[]> => {
  const reqObservations = await fetcher.post<ApiResponse<ObservationReqResponse[]>, Body>(
    `/requerimientos/observaciones`,
    body
  );

  return reqObservations.resultado.map(ObservationMapper.fromReqObservationsResultToEntity);
};
