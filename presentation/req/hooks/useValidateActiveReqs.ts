import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useValidateActiveReqs = () => {

  const [isLoadingActiveReqs, setIsLoadingActiveReqs] = useState(false);

  const validateActiveReqs = async (reqCode: string, driverRut: string) => {
    setIsLoadingActiveReqs(true);

    const response = await UseCases.validateActiveReqsUseCase(sigopApiFetcher, {
      accion: "Cuenta requerimientos activos",
      requerimiento: reqCode,
      rut: driverRut,
    });

    setIsLoadingActiveReqs(false);

    return response;
  };

  return {
    isLoadingActiveReqs,
    validateActiveReqs,
  };
};
