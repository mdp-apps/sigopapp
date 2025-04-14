import { useEffect, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";
import { Formatter } from "@/config/helpers";

import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = useQueryClient();

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

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    queryClient.invalidateQueries({
      queryKey: ["internal-movs", internalMovsBody ? internalMovsBody : "all"],
    });

    setIsRefreshing(false);
  };

  return {
    queryInternalMovements,
    isRefreshing,
    onPullToRefresh,
  };
};
