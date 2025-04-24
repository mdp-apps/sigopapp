import { useState } from "react";
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
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });

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
         setSnackbar({
           visible: true,
           message: "El comentario ha sido ingresado correctamente.",
           type: "success",
         });

        queryClient.invalidateQueries({
          queryKey: ["observations", variables.reqCode],
        });

        return;
      }

      setSnackbar({
        visible: true,
        message: "El comentario no ha sido ingresado, hubo un error en el servidor.",
        type: "error",
      });
    },
    onError: (error) => {
      setSnackbar({
        visible: true,
        message: error.message || "Ocurrió un error inesperado.",
        type: "error",
      });
    },
  });

   const dismissSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  return {
    createObservation,
    snackbar,
    dismissSnackbar,
  };
};
