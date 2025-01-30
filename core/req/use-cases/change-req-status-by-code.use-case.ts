import { HttpAdapter } from "@/config/adapters";

import { ApiResponse, Result } from "@/infrastructure/interfaces";
import { ResultMapper } from "@/infrastructure/mappers";

interface Body {
  accion: "Cambiar estado requerimiento";
  requerimiento: string;
  estado: number;
  usuario: string;
}

export const changeReqStatusByCodeUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Result> => {
  try {
    const changeReqStatus = await fetcher.post<ApiResponse<string>, Body>(
      `/requerimientos/cambiaestadorequerimiento`,
      body
    );
    console.log(changeReqStatus);

    return ResultMapper.fromResultToEntity(changeReqStatus);
  } catch (error) {
    throw new Error("Error al cambiar el estado del requerimiento");
  }
};
