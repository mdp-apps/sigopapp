import { HttpAdapter } from "@/config/adapters";

import { ActiveReqResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ReqMapper } from "@/infrastructure/mappers";
import { ActiveReq } from "@/infrastructure/entities";

interface Body {
  accion: "Cuenta requerimientos activos";
  requerimiento: string;
  rut: string;
}

export const validateActiveReqsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<ActiveReq[]> => {
  try {
    const validateActiveReqs = await fetcher.post<
      ApiResponse<ActiveReqResponse[]>,
      Body
    >(`/requerimientos/activos`, body);
    console.log(validateActiveReqs);

    return validateActiveReqs.resultado.map(
      ReqMapper.fromActiveReqsAccountResultToEntity
    );
  } catch (error) {
    throw new Error("Error al validar los requerimientos activos");
  }
};
