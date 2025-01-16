import { HttpAdapter } from "@/config/adapters";

import { ApiResponse } from "@/infrastructure/interfaces";
import { MovementMapper } from "@/infrastructure/mappers";
import { TypeInternalMov } from "@/infrastructure/entities";
import { TypeInternalMovResponse } from "../interfaces";

interface Body {
  accion: "Consultar lista tipos movimiento interno";
}

export const getInternalMovTypesUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<TypeInternalMov[]> => {
  const internalMovTypes = await fetcher.post<
    ApiResponse<TypeInternalMovResponse[]>,
    Body
  >(`/listas/tiposmovimientointerno`, body);

  return internalMovTypes.resultado.map(MovementMapper.fromTypeInternalMovResultToEntity);
};
