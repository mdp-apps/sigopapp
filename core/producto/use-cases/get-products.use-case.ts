import { HttpAdapter } from "@/config/adapters";

import { ProductResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { ProductMapper } from "@/infrastructure/mappers";
import { Product } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar lista productos";
}

export const getProductsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Product[]> => {
  const products = await fetcher.post<ApiResponse<ProductResponse[]>, Body>(
    `/listas/productos`,
    body
  );

  return products.resultado.map(ProductMapper.fromProductResultToEntity);
};
