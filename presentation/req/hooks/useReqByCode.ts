import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useReqByCode = (reqCode: string) => {
  const [reqType, setReqType] = useState(0);

  const queryReqByCode = useQuery({
    queryKey: ["reqs", reqCode],
    queryFn: () =>
      UseCases.getReqByCodeUseCase(sigopApiFetcher, {
        accion: "Consultar requerimientos por codigo",
        codigo: reqCode,
      }),
    enabled: !!reqCode,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (queryReqByCode.data) {
      const formatTypeReq = `${queryReqByCode.data.reqType}${queryReqByCode.data.formatType}`;
      setReqType(Number(formatTypeReq));
    }
  }, [queryReqByCode.data, reqType]);

  return {
    queryReqByCode,
    reqType,
  };
};
