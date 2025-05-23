import { Alert } from "react-native";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import { CRUD_OPTIONS, PALLETIZING_INPUT } from "@/config/constants";

import { useMutation } from "@tanstack/react-query";

type ConfigurePalletBody = {
  reqCode: number;
  userCode: string;

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
        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Éxito",
          textBody: "Pallets configurados correctamente.",
          button: "Salir",
        });
        return;
      };
      
      AlertNotifyAdapter.show({
        type: AlertType.DANGER,
        title: "Error",
        textBody:
          "Error al configurar pallets en el requerimiento. Revise los datos ingresados.",
        button: "ACEPTAR",
        
      });
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    configurePallets,
  };
};
