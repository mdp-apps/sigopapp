import { HttpAdapter } from "@/config/adapters";

import { DriverReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { DriverReq } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar requerimientos";
  rut: string;
  tipo: number;
}

export const getDriverReqsByRutUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<DriverReq[]> => {
  const driverReq = await fetcher.post<ApiResponse<DriverReqResponse[]>, Body>(
    `/conductor/requerimientos`,
    body
  );

  return driverReq.resultado.map(ReqMapper.fromDriverReqResultToEntity);
};
