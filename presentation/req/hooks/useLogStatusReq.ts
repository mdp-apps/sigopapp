import * as UseCases from "@/core/req/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";


export const useLogStatusReq = (reqCode: string) => {
   const queryLogStatusReq = useQuery({
     queryKey: ["log-status-req", reqCode],
     queryFn: () =>
       UseCases.getLogStatusReqUseCase(sigopApiFetcher, {
         accion: "Consultar log estado requerimiento",
         requerimiento: reqCode,
       }),
   });

  return {
    queryLogStatusReq,
  };
};
