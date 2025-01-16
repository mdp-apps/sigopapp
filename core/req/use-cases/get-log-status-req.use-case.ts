import { HttpAdapter } from "@/config/adapters";

import { LogStatusReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";

import { ReqMapper } from "@/infrastructure/mappers";
import { LogStatusReq } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar log estado requerimiento";
  requerimiento: string;
}

export const getLogStatusReqUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<LogStatusReq[]> => {
  const reqs = await fetcher.post<ApiResponse<LogStatusReqResponse[]>, Body>(
    `/requerimientos/logestados`,
    body
  );

  return reqs.resultado.map(ReqMapper.fromLogStatusReqResultToEntity);
};
