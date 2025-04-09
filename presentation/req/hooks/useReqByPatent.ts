import { useEffect, useState } from "react";
import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useReqByPatent = (patent: string, isPalletized?: boolean) => {
  const [reqType, setReqType] = useState(0);
  const [reqCode, setReqCode] = useState(0);

  const queryReqByPatent = useQuery({
    queryKey: ["reqs", isPalletized ? { patent, isPalletized } : { patent }],
    queryFn: () =>
      UseCases.getReqByPatentUseCase(sigopApiFetcher, {
        accion: "Consultar requerimientos por patente",
        patente: patent,
        tiene_pallet: isPalletized,
      }),
    enabled: !!patent,
    retry: 1,
  });

  useEffect(() => {
    if (queryReqByPatent.data) {
      const formatTypeReq = `${queryReqByPatent.data.reqType}${queryReqByPatent.data.formatType}`;
      setReqType(Number(formatTypeReq));
      setReqCode(Number(queryReqByPatent.data.reqCode));
    }
  }, [queryReqByPatent.data, reqType, reqCode]);

  return {
    queryReqByPatent,
    reqTypeByPatent: reqType,
    reqCodeByPatent: reqCode,
  };
};
