import { HttpAdapter } from "@/config/adapters";

import { OperationResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { OperationMapper } from "@/infrastructure/mappers";
import { Operation } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar lista operaciones";
}

export const getOperationsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Operation[]> => {
  const operations = await fetcher.post<ApiResponse<OperationResponse[]>, Body>(
    `/listas/operaciones`,
    body
  );

  return operations.resultado.map(OperationMapper.fromOperationResultToEntity);
};
