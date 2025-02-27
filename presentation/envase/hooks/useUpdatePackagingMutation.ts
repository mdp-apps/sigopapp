import { Alert } from "react-native";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useMutation } from "@tanstack/react-query";

type UpdatePackagingBody = {
  codeReq: number;
  codeDetailReq: number;
  mixCode: string;
  batch: number;
  codeProduct: string;
  quantity: string;
  userCode: number;
};

export const useUpdatePackagingMutation = () => {
  const updatePackaging = useMutation({
    mutationFn: (data: UpdatePackagingBody) => {
      const {
        codeReq,
        codeDetailReq,
        mixCode,
        batch,
        codeProduct,
        quantity,
        userCode,
      } = data;

      return UseCases.updatePackagingUseCase(sigopApiFetcher, {
        accion: "Actualizar envases",
        cantidad: quantity,
        codigo_mezcla: mixCode,
        codigo_usuario: userCode,
        detalle_requerimiento: codeDetailReq,
        envase: codeProduct,
        lote: batch,
        requerimiento: codeReq,
      });
    },
    onSuccess: (data) => {},
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });


  return {
    updatePackaging,
  };
};
