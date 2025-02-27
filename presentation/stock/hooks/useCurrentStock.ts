
import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";


type StockBody = {
  customer?: string;
  warehouse: string;
  product: string;
  operation: string;
};

export const useCurrentStock = (stockBody: StockBody) => {
  const queryCurrentStock = useQuery({
    queryKey: ["current-stock"],
    queryFn: async () => {
      const { customer = "", warehouse, product, operation } = stockBody;

      const response = await UseCases.getStockUseCase(sigopApiFetcher, {
        accion: "Consultar stock",
        cliente: customer,
        bodega: warehouse,
        producto: product,
        operacion: operation,
      });
      return response;
    },
  });

  return {
    queryCurrentStock,
  };
};
