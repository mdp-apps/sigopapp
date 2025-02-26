import { Alert } from "react-native";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";

type ConfigurePalletBody = {
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

export const useConfigurePalletsMutation = () => {
  const configurePallets = useMutation({
    mutationFn: (data: ConfigurePalletBody) => {
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
      } = data;

      return UseCases.configurePalletsUseCase(sigopApiFetcher, {
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
    },
    onSuccess: (data) => {
      if (data.result === "OK") {
        Alert.alert("OK", "Datos actualizados.");
      } else {
        Alert.alert(
          "Error",
          "No se han encontrado requerimientos con estos datos."
        );
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    configurePallets,
  };
};
