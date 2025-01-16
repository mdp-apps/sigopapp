import { HttpAdapter } from "@/config/adapters";

import { ResultMapper } from "@/infrastructure/mappers";
import { ApiResponse, Result } from "@/infrastructure/interfaces";

interface Body {
  accion: "Insertar observacion requerimiento";
  requerimiento: string;
  comentario: string;
  ruta: string;
  usuario: number;
}

export const insertReqObservationUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Result> => {
  try {
    const insertObservation = await fetcher.post<ApiResponse<string>, Body>(
      `/requerimientos/observaciones/insertar`,
      body
    );

    return ResultMapper.fromResultToEntity(insertObservation);
  } catch (error) {
    throw new Error("Error al insertar la observación del requerimiento");
  }
};
