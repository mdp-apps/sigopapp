import { HttpAdapter } from "@/config/adapters";

import { PalletizedResponse } from "../interfaces";
import { Palletized } from "@/infrastructure/entities";

import { ApiResponse } from "@/infrastructure/interfaces";
import { PalletizedMapper } from "@/infrastructure/mappers/palletized.mapper";

interface Body {
  accion: "Consultar produccion paletizado";
  requerimiento: string;
}

export const getPalletizedProductionUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Palletized[]> => {
  const palletizedProduction = await fetcher.post<
    ApiResponse<PalletizedResponse[]>,
    Body
    >(`/supervisor/paletizado`, body);

  return palletizedProduction.resultado.map(
    PalletizedMapper.fromPalletizedProductionResultToEntity
  );
};
