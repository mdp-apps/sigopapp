import { useEffect, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useInternalMovTypes = () => {
  const [dropdownInternalMovTypes, setDropdownInternalMovTypes] = useState<
    DropdownResponse[]
  >([]);

  const queryInternalMovTypes = useQuery({
    queryKey: ["internal-mov-types"],
    queryFn: async () => {
      const response = await UseCases.getInternalMovTypesUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar lista tipos movimiento interno",
        }
      );

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryInternalMovTypes.isSuccess) {
      const dropdownInternalMovTypeResult = queryInternalMovTypes.data.map(
        (statusReq) => ({
          code: statusReq.code.toString(),
          name: statusReq.name,
        })
      );

      setDropdownInternalMovTypes(dropdownInternalMovTypeResult);
    }
  }, [queryInternalMovTypes.isSuccess]);

  return {
    queryInternalMovTypes,
    dropdownInternalMovTypes,
  };
};
