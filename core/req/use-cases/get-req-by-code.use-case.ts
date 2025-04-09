import { HttpAdapter } from "@/config/adapters";

import { ReqResponse } from "../interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { Req } from "@/infrastructure/entities";

import { ApiResponse } from "@/infrastructure/interfaces";

interface Body {
  accion: "Consultar requerimientos por codigo";
  codigo: string;
  tiene_pallet?: boolean;
}

export const getReqByCodeUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Req> => {

  const reqData = await fetcher.post<ApiResponse<ReqResponse[]>, Body>(
    `/requerimientos/codigo`,
    body
  );


  return ReqMapper.fromReqsResultToEntity(reqData.resultado[0]);
};
