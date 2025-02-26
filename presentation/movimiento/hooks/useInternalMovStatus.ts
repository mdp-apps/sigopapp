import { useEffect, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useInternalMovStatus = () => {
  const [dropdownInternalMovStatus, setDropdownInternalMovStatus] = useState<
    DropdownResponse[]
  >([]);

  const queryInternalMovStatus = useQuery({
    queryKey: ["internal-mov-status"],
    queryFn: async () => {
      const response = await UseCases.getInternalMovStatusUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar estados movimiento interno",
        }
      );

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryInternalMovStatus.isSuccess) {
      const dropdownInternalMovTypeResult = queryInternalMovStatus.data.map(
        (statusReq) => ({
          code: statusReq.code.toString(),
          name: statusReq.name,
        })
      );

      setDropdownInternalMovStatus(dropdownInternalMovTypeResult);
    }
  }, [queryInternalMovStatus.isSuccess]);

  return {
    queryInternalMovStatus,
    dropdownInternalMovStatus,
  };
};
