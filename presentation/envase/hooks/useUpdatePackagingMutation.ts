import { Alert } from "react-native";

import * as UseCases from "@/core/envase/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/presentation/auth/store";

type UpdatePackagingBody = {
  reqCode: number;
  codeDetailReq: number;
  mixCode: string;
  batch: number;
  codeProduct: string;
  quantity: string;
  userCode?: number;
};

export const useUpdatePackagingMutation = () => {
  const {user} = useAuthStore();

  const updatePackaging = useMutation({
    mutationFn: (data: UpdatePackagingBody) => {
      const {
        reqCode,
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
        codigo_usuario: user?.code!,
        detalle_requerimiento: codeDetailReq,
        envase: codeProduct,
        lote: batch,
        requerimiento: reqCode,
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
