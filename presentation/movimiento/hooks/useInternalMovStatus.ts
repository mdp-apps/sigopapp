import { useEffect, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";

import { StatusInternalMov } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useInternalMovStatus = () => {
  const [internalMovStatus, setInternalMovStatus] = useState<StatusInternalMov[]>([]);
  const [dropdownInternalMovStatus, setDropdownInternalMovStatus] = useState<DropdownResponse[]>(
    []
  );

  const [isLoadingInternalMovStatus, setIsLoadingInternalMovStatus] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingInternalMovStatus(true);
      const response = await UseCases.getInternalMovStatusUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar estados movimiento interno",
        }
      );

      const dropdownInternalMovStatusResult = response.map((typeReq) => ({
        code: typeReq.code.toString(),
        name: typeReq.name,
      }));

      setInternalMovStatus(response);
      setDropdownInternalMovStatus(dropdownInternalMovStatusResult);
      setIsLoadingInternalMovStatus(false);
    })();
  }, []);

  return {
    internalMovStatus,
    isLoadingInternalMovStatus,
    dropdownInternalMovStatus,
  };
};

