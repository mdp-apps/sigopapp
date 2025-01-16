import { HttpAdapter } from "@/config/adapters";

import { ReqResponse } from "../interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { Req } from "@/infrastructure/entities";

import { ApiResponse } from "@/infrastructure/interfaces";

interface Body {
  accion: "Consultar requerimientos por codigo";
  codigo: string;
}

export const getReqByCodeUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Req> => {
  const reqByCode = await fetcher.post<ApiResponse<ReqResponse[]>, Body>(
    `/requerimientos/codigo`,
    body
  );

  return ReqMapper.fromReqsResultToEntity(reqByCode.resultado[0]);
};
