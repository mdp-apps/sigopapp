import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useReqByCode = (reqCode: string, isPalletized?: boolean) => {
  const [reqType, setReqType] = useState(0);


  const queryReqByCode = useQuery({
    queryKey: ["reqs", isPalletized ? { reqCode,isPalletized } : { reqCode }],
    queryFn: () => {
      return UseCases.getReqByCodeUseCase(sigopApiFetcher, {
        accion: "Consultar requerimientos por codigo",
        codigo: reqCode,
        tiene_pallet: isPalletized,
      });
    },
    enabled: !!reqCode,
    retry: 1,
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
