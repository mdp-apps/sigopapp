import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useReqByCode = (reqCode: string) => {
  const queryReqByCode = useQuery({
    queryKey: ["reqs", reqCode],
    queryFn: () =>
      UseCases.getReqByCodeUseCase(sigopApiFetcher, {
        accion: "Consultar requerimientos por codigo",
        codigo: reqCode,
      }),
    enabled: !!reqCode,
  });

  return {
    queryReqByCode,
  };
};
