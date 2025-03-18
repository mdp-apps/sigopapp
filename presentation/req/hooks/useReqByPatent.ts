import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useReqByPatent = (patent: string) => {

  const queryReqByPatent = useQuery({
    queryKey: ["reqs", {patent}],
    queryFn: () =>
      UseCases.getReqByPatentUseCase(sigopApiFetcher, {
        accion: "Consultar requerimientos por patente",
        patente: patent,
      }),
    enabled: !!patent,
    staleTime: 1000 * 60 * 5,
  });


  return {
    queryReqByPatent,
  };
};
