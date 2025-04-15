import { useMemo, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";

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

  const duplicatedProducts = useMemo(() => {
    const productCounts = queryInternalMovements.data?.result.reduce(
      (acc: Record<string, number>, movement) => {
        acc[movement.productCode] = (acc[movement.productCode] || 0) + 1;
        return acc;
      },
      {}
    );

    return Object.keys(productCounts || {}).filter(
      (productCode) => (productCounts ?? {})[productCode] > 1
    );
  }, [queryInternalMovements.data]);

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
    duplicatedProducts,
    isRefreshing,
    onPullToRefresh,
  };
};
