import { HttpAdapter } from "@/config/adapters";

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
): Promise<InternalMovement> => {
  const internalMovements = await fetcher.post<InternalMovementResponse, Body>(
    `/movimientosinternos`,
    body
  );

  return {
    result: internalMovements.resultado.map(
      MovementMapper.fromInternalMovResultToEntity
    ),
    turnTotals: MovementMapper.fromTotalInternalMovToEntity(
      internalMovements.totales
    ),
  };
};
