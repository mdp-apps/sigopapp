import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

const initialReqType = 0;

export const useDriverReqsByRut = (rut: string) => {
  const [reqType, setReqType] = useState(initialReqType);


  const queryDriverReqs = useQuery({
    queryKey: ["driver-reqs", rut, reqType],
    queryFn: () => UseCases.getDriverReqsByRutUseCase(sigopApiFetcher, {
      accion: "Consultar requerimientos",
      rut: rut,
      tipo: reqType,
    }),
    enabled: !!rut && reqType !== initialReqType,
  });

  const changeReqType = (value: number) => {
    setReqType(value);
  };

  return {
    queryDriverReqs,
    reqType,
    changeReqType,
  };
};
