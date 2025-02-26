import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useStatusReqs = () => {
  const [dropdownStatusReqs, setDropdownStatusReqs] = useState<DropdownResponse[]>([]);

  const queryStatusReqs = useQuery({
    queryKey: ["status-reqs"],
    queryFn: async () => {
      const response = await UseCases.getStatusRequirementsUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar estados requerimiento",
        }
      );

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryStatusReqs.isSuccess) {
      const dropdownStatusReqResult = queryStatusReqs.data.map((statusReq) => ({
        code: statusReq.code.toString(),
        name: statusReq.name,
      }));

      setDropdownStatusReqs(dropdownStatusReqResult);
    }
  }, [queryStatusReqs.isSuccess]);

  return {
    queryStatusReqs,
    dropdownStatusReqs,
  };
};

