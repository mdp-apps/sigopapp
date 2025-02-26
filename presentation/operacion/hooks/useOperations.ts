import { useEffect, useState } from "react";

import * as UseCases from "@/core/operacion/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useOperations = () => {
  const [dropdownOperations, setDropdownOperations] = useState<DropdownResponse[]>([]);


  const queryOperations = useQuery({
    queryKey: ["operations"],
    queryFn: async () => {
      const response = await UseCases.getOperationsUseCase(sigopApiFetcher, {
        accion: "Consultar lista operaciones",
      });

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryOperations.isSuccess) {
      const dropdownOperationResult = queryOperations.data.map((operation) => ({
        code: operation.code.toString(),
        name: `[${operation.operationCode}] - ${operation.name}`,
      }));

      setDropdownOperations(dropdownOperationResult);
    }
  }, [queryOperations.isSuccess]);

  return {
    queryOperations,
    dropdownOperations,
  };
};

