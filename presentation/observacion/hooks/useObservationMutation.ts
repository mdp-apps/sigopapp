import { Alert } from "react-native";
import { useAuthStore } from "@/presentation/auth/store";

import * as UseCases from "@/core/req/use-cases";

import { AlertNotifyAdapter, AlertType, ImageAdapter } from "@/config/adapters";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateObsBody = {
  reqCode: number;
  commment: string;
  pathImg?: string[];
};

export const useObservationMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const createObservation = useMutation({
    mutationFn: (data: CreateObsBody) => {
      const imagesName = ImageAdapter.prepareImages(data.pathImg!);

      return UseCases.createReqObservationUseCase(sigopApiFetcher, {
        accion: "Insertar observacion requerimiento",
        cod_req: data.reqCode,
        comentario: data.commment,
        usuario: user?.code!,
        ruta:
          imagesName && imagesName.length > 0 ? imagesName.at(-1) : undefined,
      });
    },
    onSuccess: (data, variables) => {
      if (data) {
        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Comentario ingresado.",
          textBody: "El comentario ha sido ingresado correctamente.",
          button: "Salir",
        });

        queryClient.invalidateQueries({
          queryKey: ["observations", variables.reqCode],
        });

        return;
      }

      AlertNotifyAdapter.show({
        type: AlertType.DANGER,
        title: data,
        textBody:
          "El comentario no ha sido ingresado, hubo un error en el servidor.",
        button: "ACEPTAR",
      });
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    createObservation,
  };
};
