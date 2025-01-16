import { HttpAdapter } from "@/config/adapters";

import { TypeReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { TypeReq } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar lista tipos requerimiento";
}

export const getTypeRequirementsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<TypeReq[]> => {
  const typeRequirements = await fetcher.post<
    ApiResponse<TypeReqResponse[]>,
    Body
  >(`/listas/tiposrequerimiento`, body);

  return typeRequirements.resultado.map(ReqMapper.fromTypeReqResultToEntity);
};
