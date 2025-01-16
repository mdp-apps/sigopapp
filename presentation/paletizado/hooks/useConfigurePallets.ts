import { useState } from "react";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

export type ConfigurePalletBody = {
  id: number;
  enterKiosk: number;
  option: number;
  reqCode: number;
  hasPallet: number;
  userCode: string;

  mixQuantity?: number;
  batch?: number;
  mix?: string;
  palletQuantity?: number;
  totalWeight?: number;
};

export const useConfigurePallets = () => {
  const [isLoadingConfigurePallets, setIsLoadingConfigurePallets] = useState(false);

  const configurePallets = async (body: ConfigurePalletBody) => {
    const {
      id,
      enterKiosk,
      option,
      reqCode,
      hasPallet,
      userCode,

      mixQuantity = 0,
      batch = 0,
      mix = "",
      palletQuantity = 0,
      totalWeight = 0,
    } = body;

    setIsLoadingConfigurePallets(true);

    const response = await UseCases.configurePalletsUseCase(sigopApiFetcher, {
      accion: "Configurar pallets",
      id: id,
      ingresa_kiosco: enterKiosk,
      opcion: option,
      requerimiento: reqCode,
      tiene_pallet: hasPallet,
      usuario: userCode,

      cant_mezcla: mixQuantity,
      lote: batch,
      mezcla: mix,
      n_pallet: palletQuantity,
      peso_total: totalWeight,
    });

    setIsLoadingConfigurePallets(false);

    return response;
  };

  return {
    isLoadingConfigurePallets,
    configurePallets,
  };
};
