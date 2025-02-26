import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useQuery } from "@tanstack/react-query";

export const usePalletizedProduction = (reqCode: number) => {
  const queryPalletizedProduction = useQuery({
    queryKey: ["palletized-production", reqCode],
    queryFn: () =>
      UseCases.getPalletizedProductionUseCase(sigopApiFetcher, {
        accion: "Consultar produccion paletizado",
        requerimiento: reqCode,
      }),
    enabled: !!reqCode,
  });

  return {
    queryPalletizedProduction,
  };
};
