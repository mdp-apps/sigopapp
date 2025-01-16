import { HttpAdapter } from "@/config/adapters";

import { StatusReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { StatusReq } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar estados requerimiento";
}

export const getStatusRequirementsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<StatusReq[]> => {
  const typeRequirements = await fetcher.post<
    ApiResponse<StatusReqResponse[]>,
    Body
  >(`/listas/estadosrequerimiento`, body);

  return typeRequirements.resultado.map(ReqMapper.fromStatusReqResultToEntity);
};
