import { Alert } from "react-native";

import * as UseCases from "@/core/envase/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import { ProductReq } from "@/infrastructure/entities";
import { COMPONENT_TYPE } from "@/config/constants";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdatePackagingBody = {
  reqCode: number;
  batch: number;
  quantity: string;
  reqType: number;
};

export const useUpdatePackagingMutation = () => {
  const queryClient = useQueryClient();

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
    onSuccess: (data, variables) => {
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

      queryClient.setQueryData<ProductReq[]>(
        ["products-req", variables.reqCode, variables.reqType],
        (oldData) => {
          if (!oldData) return [];

          const updatedData = oldData.map((product) => {
            if (
              product.batch === variables.batch &&
              product.componentType === COMPONENT_TYPE.envasado
            ) {
              return { ...product, quantity: Number(variables.quantity) };
            }
            return product;
          });

          return updatedData;
        }
      );
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    updatePackaging,
  };
};
