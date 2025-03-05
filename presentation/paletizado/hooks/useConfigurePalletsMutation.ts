import { Alert } from "react-native";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { CRUD_OPTIONS, PALLETIZING_INPUT } from "@/config/constants";

import { useMutation } from "@tanstack/react-query";

type ConfigurePalletBody = {
  reqCode: number;
  userCode: string;
  
  hasPallet: number;
  mixQuantityKG: number;
  batch: number;
  mixCode: string;

  palletQuantity: number;
  palletTotalWeight: number;
};

export const useConfigurePalletsMutation = () => {
  const configurePallets = useMutation({
    mutationFn: (data: ConfigurePalletBody) => {
      const {
        reqCode,
        userCode,

        hasPallet,
        mixQuantityKG,
        batch,
        mixCode,

        palletQuantity,
        palletTotalWeight,
      } = data;


      return UseCases.configurePalletsUseCase(sigopApiFetcher, {
        accion: "Configurar pallets",
        ingresa_kiosco: PALLETIZING_INPUT.mobile,
        opcion: CRUD_OPTIONS.insert,
        requerimiento: reqCode,
        tiene_pallet: hasPallet,
        usuario: userCode,

        cant_mezcla: mixQuantityKG,
        lote: batch,
        mezcla: mixCode,
        n_pallet: palletQuantity,
        peso_total: palletTotalWeight,
      });
    },
    onSuccess: (data) => {
      if (data.result === "OK") {
        Alert.alert("OK", "Pallets configurados correctamente en el requerimiento.");
      } else {
        Alert.alert(
          "Error",
          "Error al configurar pallets en el requerimiento. Revise los datos ingresados."
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
