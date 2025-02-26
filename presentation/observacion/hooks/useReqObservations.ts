import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useQuery } from "@tanstack/react-query";


export const useReqObservations = (reqCode: string) => {
  const queryObservations = useQuery({
    queryKey: ["observations", reqCode],
    queryFn: () =>
      UseCases.getReqObservationsUseCase(sigopApiFetcher, {
        accion: "Consultar observaciones requerimiento",
        requerimiento: reqCode,
      }),
    enabled: !!reqCode,
  });


  return {
    queryObservations,
  };
};
