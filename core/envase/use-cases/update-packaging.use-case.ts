import { HttpAdapter } from "@/config/adapters";

import { ApiResponse, Result } from "@/infrastructure/interfaces";
import { ResultMapper } from "@/infrastructure/mappers";

interface Body {
  accion: "Actualizar envases";
  requerimiento: number;
  detalle_requerimiento: number;
  codigo_mezcla: string;
  lote: number;
  envase: string;
  cantidad: number;
  codigo_usuario: number;
}

export const updatePackagingUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Result> => {
  try {
    const updatePackaging = await fetcher.post<ApiResponse<string>, Body>(
      `/supervisor/actualizarenvases`,
      body
    );

    return ResultMapper.fromResultToEntity(updatePackaging);
  } catch (error) {
    throw new Error("Error al actualizar envases");
  }
};
