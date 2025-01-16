import { HttpAdapter } from "@/config/adapters";

import { DriverReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { CurrentStatusReq } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar estado requerimiento";
  requerimiento: string;
}

export const getReqStatusByCodeUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<CurrentStatusReq> => {
  const reqStatus = await fetcher.post<ApiResponse<DriverReqResponse[]>, Body>(
    `/requerimientos/consultaestado`,
    body
  );

  return ReqMapper.fromCurrentStatusReqResultToEntity(reqStatus.resultado[0]);
};
