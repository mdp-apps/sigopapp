import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useObservationImage = (
  reqCode?: number,
  fileName?: string,
  method?: string
) => {

  const queryObservationImage = useQuery({
    queryKey: ["observation-image", reqCode],
    queryFn: () =>
      UseCases.getReqObservationImageUseCase(sigopApiFetcher, {
        requerimiento: String(reqCode),
        filename: fileName!,
        method: method!,
      }),
    enabled: !!reqCode,
  });
  

  return {
    queryObservationImage,
  }
};
