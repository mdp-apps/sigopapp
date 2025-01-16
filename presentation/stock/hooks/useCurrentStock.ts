import { useState } from "react";

import * as UseCases from "@/core/supervisor/use-cases";

import { Stock } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";


type StockBody = {
  customer?: string;
  warehouse: string;
  product: string;
  operation: string;
};

export const useCurrentStock = () => {
  const [currentStock, setCurrentStock] = useState<Stock[]>([]);
  const [isLoadingCurrentStock, setIsLoadingCurrentStock] = useState(false);


    const getCurrentStock = async (reqsBody: StockBody) => {
      setIsLoadingCurrentStock(true);

      const body: UseCases.StockBody = {
        accion: "Consultar stock",
        cliente: reqsBody.customer || "",
        bodega: reqsBody.warehouse,
        producto: reqsBody.product,
        operacion: reqsBody.operation,
      };

      const response = await UseCases.getStockUseCase(sigopApiFetcher, body);

      setCurrentStock(response);
      setIsLoadingCurrentStock(false);
    };

  return {
    currentStock,
    isLoadingCurrentStock,
    getCurrentStock,
  };
};
