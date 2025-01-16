import { HttpAdapter } from "@/config/adapters";

import { ApiResponse } from "@/infrastructure/interfaces";
import { MovementMapper } from "@/infrastructure/mappers";
import { InternalMovementResponse } from "../interfaces";
import { InternalMovement } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar movimientos internos";
  codigo: string;
  codigo_detalle: string;
  fecha: string;
  turno: string;
  estado: string;
  tipo_movimiento_interno: string;
  cliente: string;
}

export const getInternalMovsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<InternalMovement[]> => {
  const internalMovements = await fetcher.post<
    ApiResponse<InternalMovementResponse[]>,
    Body
  >(`/movimientosinternos`, body);

  return internalMovements.resultado.map(
    MovementMapper.fromInternalMovResultToEntity
  );
};
