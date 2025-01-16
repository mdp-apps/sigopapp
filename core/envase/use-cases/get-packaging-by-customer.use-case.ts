import { HttpAdapter } from "@/config/adapters";

import { ApiResponse } from "@/infrastructure/interfaces";
import { PackagingMapper } from "@/infrastructure/mappers";
import { Packaging } from "@/infrastructure/entities";
import { PackagingResponse } from "../interfaces";

interface Body {
  accion: "Consultar lista envases";
  cliente: number;
}

export const getPackagingByCustomerUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Packaging[]> => {
  const packaging = await fetcher.post<ApiResponse<PackagingResponse[]>, Body>(
    `/listas/envases`,
    body
  );

  return packaging.resultado.map(PackagingMapper.fromPackagingResultToEntity);
};
