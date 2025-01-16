import { HttpAdapter } from "@/config/adapters";

import { StockResponse } from "../interfaces";
import { Stock } from "@/infrastructure/entities";
import { StockMapper } from "@/infrastructure/mappers";

import { ApiResponse } from "@/infrastructure/interfaces";

export interface StockBody {
  accion: "Consultar stock";
  cliente: string;
  bodega: string;
  producto: string;
  operacion: string;
}

export const getStockUseCase = async (
  fetcher: HttpAdapter,
  body: StockBody
): Promise<Stock[]> => {
  const stock = await fetcher.post<ApiResponse<StockResponse[]>, StockBody>(
    `/supervisor/consulta_stock`,
    body
  );

  return stock.resultado.map(StockMapper.fromStockResultToEntity);
};
