import { HttpAdapter } from "@/config/adapters";

import { ActiveReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { ActiveReq } from "@/infrastructure/entities";

export interface ValidateActiveReqsBody {
  accion: "Cuenta requerimientos activos";
  requerimiento: string;
  rut: string;
}

export const validateActiveReqsUseCase = async (
  fetcher: HttpAdapter,
  body: ValidateActiveReqsBody
): Promise<ActiveReq[]> => {
  try {
    const validateActiveReqs = await fetcher.post<
      ApiResponse<ActiveReqResponse[]>,
      ValidateActiveReqsBody
    >(`/requerimientos/activos`, body);

    return validateActiveReqs.resultado.map(
      ReqMapper.fromActiveReqsAccountResultToEntity
    );
  } catch (error) {
    throw new Error("Error al validar los requerimientos activos");
  }
};
