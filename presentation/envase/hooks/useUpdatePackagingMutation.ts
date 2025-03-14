import { Alert } from "react-native";

import { useAuthStore } from "@/presentation/auth/store";

import * as UseCases from "@/core/envase/use-cases";
import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";

type UpdatePackagingBody = {
  reqCode: number;
  codeDetailReq: number;
  mixCode: string;
  batch: number;
  productCode: string;
  quantity: string;
  userCode?: number;
};

export const useUpdatePackagingMutation = () => {
  const { user } = useAuthStore();

  const updatePackaging = useMutation({
    mutationFn: (data: UpdatePackagingBody) => {
      const { reqCode, codeDetailReq, mixCode, batch, productCode, quantity } =
        data;

      return UseCases.updatePackagingUseCase(sigopApiFetcher, {
        accion: "Actualizar envases",
        cantidad: Number(quantity),
        codigo_mezcla: mixCode,
        codigo_usuario: user?.code!,
        detalle_requerimiento: codeDetailReq,
        envase: productCode,
        lote: batch,
        requerimiento: reqCode,
      });
    },
    onSuccess: (data) => {
      if (data.result === "OK") {
        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Éxito",
          textBody: "Cantidad de envases actualizada correctamente.",
          button: "Salir",
        });
        return;
      }

      AlertNotifyAdapter.show({
        type: AlertType.DANGER,
        title: "Error",
        textBody: "No se pudo actualizar la cantidad de envases, intente nuevamente.",
        button: "ACEPTAR",
      });
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    updatePackaging,
  };
};
