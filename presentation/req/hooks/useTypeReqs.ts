import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useTypeReqs = () => {
  const [dropdownTypeReqs, setDropdownTypeReqs] = useState<DropdownResponse[]>(
    []
  );

  const queryTypeReqs = useQuery({
    queryKey: ["type-reqs"],
    queryFn: async () => {
      const response = await UseCases.getTypeRequirementsUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar lista tipos requerimiento",
        }
      );

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryTypeReqs.isSuccess) {
      const dropdownTypeReqResult = queryTypeReqs.data.map((typeReq) => ({
        code: typeReq.code.toString(),
        name: typeReq.name,
      }));
      setDropdownTypeReqs(dropdownTypeReqResult);
    }
  }, [queryTypeReqs.isSuccess]);

  return {
    queryTypeReqs,
    dropdownTypeReqs,
  };
};
