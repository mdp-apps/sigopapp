import { useState } from "react";
import { Alert } from "react-native";

import * as UseCases from "@/core/req/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";
import { REQ_STATUS } from "@/config/constants";

import { useMutation } from "@tanstack/react-query";

export const useChangeReqStatusMutation = () => {
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);

  const changeReqStatus = useMutation({
    mutationFn: (data: Omit<UseCases.ChangeReqStatusBody, "accion">) => {
      return UseCases.changeReqStatusByCodeUseCase(sigopApiFetcher, {
        ...data,
        accion: "Cambiar estado requerimiento",
      });
    },
    onSuccess: (data) => {
      if (data.result !== "") {
        setCurrentStatus(REQ_STATUS.pendiente);
      } else {
        Alert.alert("Alerta", "No se ha confirmado la llegada.");
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const changeCurrentStatus = (status: number) => {
    setCurrentStatus(status);
  };

  return {
    changeReqStatus,
    currentStatus,
    changeCurrentStatus,
  };
};
