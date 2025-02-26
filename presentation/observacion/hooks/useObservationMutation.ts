import { Alert } from "react-native";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";

type CreateObsBody = {
  reqCode: string;
  commment: string;
  path: string;
  userCode: number;
};

export const useObservationMutation = () => {
  const createObservation = useMutation({
    mutationFn: (data: CreateObsBody) => {
      return UseCases.createReqObservationUseCase(sigopApiFetcher, {
        accion: "Insertar observacion requerimiento",
        requerimiento: data.reqCode,
        comentario: data.commment,
        ruta: data.path,
        usuario: data.userCode,
      });
    },
    onSuccess: (data) => {},
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });


  return {
    createObservation,
  };
};
