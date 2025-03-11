import { Alert } from "react-native";

import * as UseCases from "@/core/req/use-cases";

import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";

type CreateObsBody = {
  reqCode: string;
  commment: string;
  path?: string;
  userCode: number;
};

export const useObservationMutation = () => {
  const createObservation = useMutation({
    mutationFn: (data: CreateObsBody) => {
      console.log(data);
      return UseCases.createReqObservationUseCase(sigopApiFetcher, {
        accion: "Insertar observacion requerimiento",
        requerimiento: data.reqCode,
        comentario: data.commment,
        usuario: String(data.userCode),
        ruta: data.path || "",
      });
    },
    onSuccess: (data) => {
      if (data.result === "OK") {
        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Comentario ingresado.",
          textBody: "El comentario ha sido ingresado correctamente.",
          button: "Salir",
        });
        return;
      }

      AlertNotifyAdapter.show({
        type: AlertType.DANGER,
        title: "Comentario no ingresado.",
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
