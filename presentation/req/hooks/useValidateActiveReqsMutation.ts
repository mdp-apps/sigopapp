import { useEffect } from "react";
import { Alert } from "react-native";

import { useChangeReqStatusMutation } from "./useChangeReqStatusMutation";

import * as UseCases from "@/core/req/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";
import { REQ_STATUS } from "@/config/constants";
import { useReqStatusByCode } from "./useReqStatusByCode";
import { useAuthStore } from "@/presentation/auth/store";

export const useValidateActiveReqsMutation = (reqCode: number) => {
  const { user } = useAuthStore();

  const { queryReqStatus } = useReqStatusByCode(reqCode);
  const { changeReqStatus, changeCurrentStatus } = useChangeReqStatusMutation();

  useEffect(() => {
    if (queryReqStatus.data) {
      changeCurrentStatus(queryReqStatus.data.status);
    }
  }, [queryReqStatus.data]);

  const validateActiveReqs = useMutation({
    mutationFn: (data: Omit<UseCases.ValidateActiveReqsBody, "accion">) => {
      return UseCases.validateActiveReqsUseCase(sigopApiFetcher, {
        ...data,
        accion: "Cuenta requerimientos activos",
      });
    },
    onSuccess: (data) => {
      if (data[0].loadNumber === 0) {
        changeReqStatus.mutate({
          requerimiento: String(reqCode),
          estado: REQ_STATUS.pendiente,
          usuario: String(user?.code),
        });

        return;
      }

      Alert.alert("Alerta", "Hay otro requerimiento en curso.");
      
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    validateActiveReqs,
  };
};
