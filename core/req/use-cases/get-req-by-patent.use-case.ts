import { HttpAdapter } from "@/config/adapters";

import { ReqResponse } from "../interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { Req } from "@/infrastructure/entities";

import { ApiResponse } from "@/infrastructure/interfaces";

interface Body {
  accion: "Consultar requerimientos por patente";
  patente: string;
}

export const getReqByPatentUseCase = async (
  fetcher: HttpAdapter,
  body: Body,
  status?: number
): Promise<Req> => {

  const reqByPatent = await fetcher.post<ApiResponse<ReqResponse[]>, Body>(
    `/requerimientos/patente`,
    body
  );

  const reqPatentByStatus = reqByPatent.resultado.find(
    (req) => req.estado === status
    );

  return ReqMapper.fromReqsResultToEntity(
    reqPatentByStatus ? reqPatentByStatus : reqByPatent.resultado[0]
  );
};
