import { useEffect, useState } from "react";
import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useReqByPatent = (patent: string, statusCode?: number) => {
  const [reqType, setReqType] = useState(0);
  const [reqCode, setReqCode] = useState(0);

  const queryReqByPatent = useQuery({
    queryKey: ["reqs", { patent }],
    queryFn: () =>
      UseCases.getReqByPatentUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar requerimientos por patente",
          patente: patent,
        },
        statusCode,
      ),
    enabled: !!patent,
    staleTime: 1000 * 60 * 5,
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
