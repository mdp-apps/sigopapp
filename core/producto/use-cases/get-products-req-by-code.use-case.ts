import { HttpAdapter } from "@/config/adapters";

import { ProductReqResponse } from "@/core/producto/interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";

import { ProductReq } from "@/infrastructure/entities";
import { ProductMapper } from "@/infrastructure/mappers";

interface Body {
  accion: "Consultar productos requerimiento";
  requerimiento: number;
  tipo_requerimiento: string;
}

export const getProductsReqByCodeUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<ProductReq[]> => {
  const productsReqByCode = await fetcher.post<ApiResponse<ProductReqResponse[]>, Body>(
    `/requerimientos/productos`,
    body
  );

  return productsReqByCode.resultado.map(ProductMapper.fromProductReqResultToEntity);
};
