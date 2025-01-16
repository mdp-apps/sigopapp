import { useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";

import { InternalMovement } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";

type InternalMovementBody = {
  code: string;
  detailCode: string;
  date: string;
  turn: string;
  internalMovementStatus: string;
  internalMovementType: string;
  customer: string;
}


export const useInternalMovements = () => {
  const [internalMovements, setInternalMovements] = useState<InternalMovement[]>([]);
  const [isLoadingInternalMovements, setIsLoadingInternalMovements] = useState(false);

  const getInternalMovements = async (internalMovsBody: InternalMovementBody) => {
    setIsLoadingInternalMovements(true);
      
    const response = await UseCases.getInternalMovsUseCase(sigopApiFetcher, {
      accion: "Consultar movimientos internos",
      codigo: internalMovsBody.code,
      codigo_detalle: internalMovsBody.detailCode,
      fecha: internalMovsBody.date,
      turno: internalMovsBody.turn,
      estado: internalMovsBody.internalMovementStatus,
      tipo_movimiento_interno: internalMovsBody.internalMovementType,
      cliente: internalMovsBody.customer,
    });

    setInternalMovements(response);
    setIsLoadingInternalMovements(false);
  }

  return {
    internalMovements,
    isLoadingInternalMovements,
    getInternalMovements,
  };
};

