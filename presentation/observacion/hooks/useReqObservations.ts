import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { ObservationReq } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";


export const useReqObservations = (reqCode: string) => {
  const [reqObservations, setReqObservations] = useState<ObservationReq[]>([]);

  const [isLoadingReqObservations, setIsLoadingReqObservations] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingReqObservations(true);
      const response = await UseCases.getReqObservationsUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar observaciones requerimiento",
          requerimiento: reqCode,
        }
      );

      setReqObservations(response);
      setIsLoadingReqObservations(false);
    })();
  }, [reqCode]);

  return {
    reqObservations,
    isLoadingReqObservations,
  };
};
