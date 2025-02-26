import { HttpAdapter } from "@/config/adapters";

import { ResultMapper } from "@/infrastructure/mappers";
import { ApiResponse, Result } from "@/infrastructure/interfaces";

interface ObservationBody {
  accion: "Insertar observacion requerimiento";
  requerimiento: string;
  comentario: string;
  ruta: string;
  usuario: number;
}

export const createReqObservationUseCase = async (
  fetcher: HttpAdapter,
  body: ObservationBody
): Promise<Result> => {
  try {
    const createObservation = await fetcher.post<
      ApiResponse<string>,
      ObservationBody
    >(`/requerimientos/observaciones/insertar`, body);

    return ResultMapper.fromResultToEntity(createObservation);
  } catch (error) {
    throw new Error("Error al crear la observación del requerimiento");
  }
};
