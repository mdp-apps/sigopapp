import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { DriverReq } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";

const initialReqType = 0;

export const useDriverReqsByRut = (rut: string) => {
  const [driverReqs, setDriverReqs] = useState<DriverReq[]>([]);
   const [reqType, setReqType] = useState(initialReqType);

  const [isLoadingDriverReqs, setIsLoadingDriverReqs] = useState(false);

  useEffect(() => {
    const getDriverReqs = async () => {
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
    };

    if (rut) getDriverReqs();
  }, [rut, reqType]);

  const changeReqType = (value: number) => { 
    setReqType(value);
  }

  return {
    driverReqs,
    reqType,
    isLoadingDriverReqs,
    changeReqType,
  };
};
