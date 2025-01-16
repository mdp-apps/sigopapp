import { HttpAdapter } from "@/config/adapters";

import { ApiResponse } from "@/infrastructure/interfaces";
import { MovementMapper } from "@/infrastructure/mappers";
import { StatusInternalMov } from "@/infrastructure/entities";
import { StatusInternalMovResponse } from "../interfaces";

interface Body {
  accion: "Consultar estados movimiento interno";
}

export const getInternalMovStatusUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<StatusInternalMov[]> => {
  const internalMovStatus = await fetcher.post<
    ApiResponse<StatusInternalMovResponse[]>,
    Body
  >(`/listas/estadosmovimientointerno/`, body);

  return internalMovStatus.resultado.map(
    MovementMapper.fromStatusInternalMovResultToEntity
  );
};
