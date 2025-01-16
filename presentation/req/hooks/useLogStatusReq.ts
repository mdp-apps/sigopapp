import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";
import { LogStatusReq } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";


export const useLogStatusReq = (reqCode: string) => {
  const [logStatusReq, setLogStatusReq] = useState<LogStatusReq[]>([]);
  const [isLoadingLogStatusReq, setIsLoadingLogStatusReq] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingLogStatusReq(true);

      const response = await UseCases.getLogStatusReqUseCase(sigopApiFetcher, {
        accion: "Consultar log estado requerimiento",
        requerimiento: reqCode,
      });

      setLogStatusReq(response);

      setIsLoadingLogStatusReq(false);
    })();
  }, [reqCode]);

  return {
    logStatusReq,
    isLoadingLogStatusReq,
  };
};
