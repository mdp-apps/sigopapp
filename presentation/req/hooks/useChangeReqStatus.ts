import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";


export const useChangeReqStatus = () => {

  const [isLoadingChangeReqStatus, setIsLoadingChangeReqStatus] = useState(false);

  const changeReqStatus = async (
    reqCode: string,
    status: number,
    userId: number
  ) => {
    setIsLoadingChangeReqStatus(true);
    
    const response = await UseCases.changeReqStatusByCodeUseCase(
      sigopApiFetcher,
      {
        accion: "Cambiar estado requerimiento",
        requerimiento: reqCode,
        estado: status,
        usuario: String(userId),
      }
    );
    console.log("resultChangeReqStatus", JSON.stringify(response));

    setIsLoadingChangeReqStatus(false);

    return response;
  };

  return {
    isLoadingChangeReqStatus,
    changeReqStatus,
  };
};
