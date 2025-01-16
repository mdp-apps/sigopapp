import { useEffect, useState } from "react";

import * as UseCases from "@/core/operacion/use-cases";

import { Operation } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useOperations = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [dropdownOperations, setDropdownOperations] = useState<DropdownResponse[]>([]);

  const [isLoadingOperations, setIsLoadingOperations] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingOperations(true);
      const response = await UseCases.getOperationsUseCase(sigopApiFetcher, {
        accion: "Consultar lista operaciones",
      });

       const dropdownOperationResult = response.map((operation) => ({
         code: operation.code.toString(),
         name: `[${operation.operationCode}] - ${operation.name}`,
       }));

      setOperations(response);
      setDropdownOperations(dropdownOperationResult);
      setIsLoadingOperations(false);
    })();
  }, []);

  return {
    operations,
    isLoadingOperations,
    dropdownOperations,
  };
};

