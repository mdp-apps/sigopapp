import { Alert } from "react-native";

import * as UseCases from "@/core/envase/use-cases";
import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";

type UpdatePackagingBody = {
  reqCode: number;
  batch: number;
  quantity: string;
};

export const useUpdatePackagingMutation = () => {
  const updatePackaging = useMutation({
    mutationFn: (data: UpdatePackagingBody) => {
      const { reqCode, batch, quantity } = data;

      return UseCases.updatePackagingUseCase(sigopApiFetcher, {
        accion: "Actualizar envases",
        cod_req: reqCode,
        cantidad: Number(quantity),
        lote: batch,
      });
    },
    onSuccess: (data) => {
      if (data.result) {
        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Éxito",
          textBody: "Cantidad de envases actualizada correctamente.",
          button: "Salir",
        });
      }

      if (data.error) {
        AlertNotifyAdapter.show({
          type: AlertType.DANGER,
          title: "Error",
          textBody:
            "No se pudo actualizar la cantidad de envases, intente nuevamente.",
          button: "ACEPTAR",
        });
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    updatePackaging,
  };
};
