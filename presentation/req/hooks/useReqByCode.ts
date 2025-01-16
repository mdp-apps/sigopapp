import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { Req } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useReqByCode = () => {
  const [req, setReq] = useState<Req>({} as Req);

  const [isLoadingReq, setIsLoadingReq] = useState(false);

  const getReqByCode = async (reqCode: string) => {
    setIsLoadingReq(true);
    const response = await UseCases.getReqByCodeUseCase(sigopApiFetcher, {
      accion: "Consultar requerimientos por codigo",
      codigo: reqCode,
    });

    setReq(response);
    setIsLoadingReq(false);
  }

  return {
    req,
    isLoadingReq,
    getReqByCode,
  };
};
