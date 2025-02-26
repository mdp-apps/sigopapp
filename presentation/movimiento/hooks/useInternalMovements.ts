import * as UseCases from "@/core/movimiento/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useQuery } from "@tanstack/react-query";

type InternalMovementBody = {
  code: string;
  detailCode: string;
  date: string;
  turn: string;
  internalMovementStatus: string;
  internalMovementType: string;
  customer: string;
};

export const useInternalMovements = (
  internalMovsBody?: InternalMovementBody
) => {
  const queryInternalMovements = useQuery({
    queryKey: ["internal-movs", internalMovsBody ? internalMovsBody : "all"],
    queryFn: async () => {
      const {
        code = "",
        detailCode = "",
        date = "",
        turn = "",
        internalMovementStatus = "",
        internalMovementType = "",
        customer = "",
      } = internalMovsBody || {};

      const response = await UseCases.getInternalMovsUseCase(sigopApiFetcher, {
        accion: "Consultar movimientos internos",
        codigo: code,
        codigo_detalle: detailCode,
        fecha: date,
        turno: turn,
        estado: internalMovementStatus,
        tipo_movimiento_interno: internalMovementType,
        cliente: customer,
      });

      return response;
    },
  });

  return {
    queryInternalMovements,
  };
};
