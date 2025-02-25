
import * as UseCases from "@/core/req/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";


export const useReqStatusByCode = (reqCode: number) => {
  const queryReqStatus = useQuery({
    queryKey: ["req-status", reqCode],
    queryFn: async () =>
      await UseCases.getReqStatusByCodeUseCase(sigopApiFetcher, {
        accion: "Consultar estado requerimiento",
        requerimiento: String(reqCode),
      }),
    enabled: !!reqCode,
  });

  return {
    queryReqStatus,
  };
};


