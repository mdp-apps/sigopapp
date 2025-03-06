import { useEffect, useState } from "react";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useQuery } from "@tanstack/react-query";

export const usePalletizedProductionByCode = (reqCode: number) => {
  const [isProductionWithPallet, setIsProductionWithPallet] = useState(false);
  const [palletQuantity, setPalletQuantity] = useState(0);
  const [palletTotalWeight, setPalletTotalWeight] = useState(0);

  const queryPalletizedProduction = useQuery({
    queryKey: ["palletized-production", reqCode],
    queryFn: () =>
      UseCases.getPalletizedProductionUseCase(sigopApiFetcher, {
        accion: "Consultar produccion paletizado",
        requerimiento: reqCode,
      }),
    enabled: !!reqCode,
    
  });

  useEffect(() => {
    if (queryPalletizedProduction.isSuccess) {
      const somePallet = queryPalletizedProduction.data.some(
        (pallet) => pallet.hasPallet
      );

      setIsProductionWithPallet(somePallet);

      if (somePallet) {
        const palletized = queryPalletizedProduction.data.at(0);

        if (palletized) {
          setPalletQuantity(palletized.palletQuantity);
          setPalletTotalWeight(palletized.palletTotalWeight);
        }
      }
    }
  }, [queryPalletizedProduction.data]);

  return {
    queryPalletizedProduction,
    isProductionWithPallet,
    palletQuantity,
    palletTotalWeight,
  };
};
