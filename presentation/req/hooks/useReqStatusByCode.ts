import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { CurrentStatusReq } from "@/infrastructure/entities";


export const useReqStatusByCode = (reqCode: string) => {
  const [reqStatus, setReqStatus] = useState<CurrentStatusReq>(
    {} as CurrentStatusReq
  );
  const [isLoadingReqStatus, setIsLoadingReqStatus] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingReqStatus(true);
      const response = await UseCases.getReqStatusByCodeUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar estado requerimiento",
          requerimiento: reqCode,
        }
      );

      setReqStatus(response);
      setIsLoadingReqStatus(false);
    })();
  }, [reqCode]);

  return {
    reqStatus,
    isLoadingReqStatus,
  };
};


