import { useEffect, useState } from "react";

import * as UseCases from "@/core/supervisor/use-cases";

import { Palletized } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const usePalletizedProduction = (reqCode: number) => {
  const [palletizedProduction, setPalletizedProduction] = useState<Palletized[]>([]);

  const [isLoadingPalletized, setIsLoadingPalletized] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingPalletized(true);
      const response = await UseCases.getPalletizedProductionUseCase(sigopApiFetcher, {
        accion: "Consultar produccion paletizado",
        requerimiento: reqCode,
      });

      setPalletizedProduction(response);
      setIsLoadingPalletized(false);
    })();
  }, [reqCode]);


  return {
    palletizedProduction,
    isLoadingPalletized,
    setPalletizedProduction,
  };
};

