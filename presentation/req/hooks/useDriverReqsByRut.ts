import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { DriverReq } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useDriverReqsByRut = (rut: string, reqType: number) => {
  const [driverReqs, setDriverReqs] = useState<DriverReq[]>([]);

  const [isLoadingDriverReqs, setIsLoadingDriverReqs] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingDriverReqs(true);
      const response = await UseCases.getDriverReqsByRutUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar requerimientos",
          rut: rut,
          tipo: reqType,
        }
      );

      setDriverReqs(response);
      setIsLoadingDriverReqs(false);
    })();
  }, [rut, reqType]);

  return {
    driverReqs,
    isLoadingDriverReqs,
  };
};
