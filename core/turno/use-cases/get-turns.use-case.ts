import { HttpAdapter } from "@/config/adapters";

import { TurnResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { TurnMapper } from "@/infrastructure/mappers";
import { Turn } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar lista turnos";
}

export const getTurnsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Turn[]> => {
  const turns = await fetcher.post<ApiResponse<TurnResponse[]>, Body>(
    `/listas/turnos`,
    body
  );

  return turns.resultado.map(TurnMapper.fromTurnResultToEntity);
};
