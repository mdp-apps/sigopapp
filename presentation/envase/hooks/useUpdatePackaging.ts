import { useState } from "react";

import * as UseCases from "@/core/supervisor/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

type UpdatePackagingBody = {
  codeReq: number;
  codeDetailReq: number;
  mixCode: string;
  batch: number;
  codeProduct: string;
  quantity: string;
  userCode: number;
};

export const useUpdatePackaging = () => {
  const [isLoadingUpdatePackaging, setIsLoadingUpdatePackaging] =
    useState(false);

  const updatePackaging = async (body: UpdatePackagingBody) => {
    const {
      codeReq,
      codeDetailReq,
      mixCode,
      batch,
      codeProduct,
      quantity,
      userCode,
    } = body;

    setIsLoadingUpdatePackaging(true);

    const response = await UseCases.updatePackagingUseCase(sigopApiFetcher, {
      accion: "Actualizar envases",
      cantidad: quantity,
      codigo_mezcla: mixCode,
      codigo_usuario: userCode,
      detalle_requerimiento: codeDetailReq,
      envase: codeProduct,
      lote: batch,
      requerimiento: codeReq,
    });
    // console.log("updatePackaging", response);

    setIsLoadingUpdatePackaging(false);

    return response;
  };

  return {
    isLoadingUpdatePackaging,
    updatePackaging,
  };
};
