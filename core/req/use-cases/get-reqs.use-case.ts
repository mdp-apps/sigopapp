import { HttpAdapter } from "@/config/adapters";

import { ReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";

import { ReqMapper } from "@/infrastructure/mappers";
import { Req } from "@/infrastructure/entities";

export interface ReqsBody {
  accion: "Consultar requerimientos";
  patente?: string;
  requerimiento?: string;
  fecha?: string;
  turno?: string;
  estado?: string;
  tipo_requerimiento?: string;
  cliente?: string;
  conductor?: string;
}

export const getReqsUseCase = async (
  fetcher: HttpAdapter,
  body: ReqsBody
): Promise<Req[]> => {
  const reqs = await fetcher.post<ApiResponse<ReqResponse[]>, ReqsBody>(
    `/requerimientos`,
    body
  );

  return reqs.resultado.map(ReqMapper.fromReqsResultToEntity);
};
