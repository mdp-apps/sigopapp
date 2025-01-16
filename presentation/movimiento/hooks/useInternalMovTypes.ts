import { useEffect, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";

import { TypeInternalMov } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useInternalMovTypes = () => {
  const [internalMovTypes, setInternalMovTypes] = useState<TypeInternalMov[]>([]);
  const [dropdownInternalMovTypes, setDropdownInternalMovTypes] = useState<
    DropdownResponse[]
  >([]);

  const [isLoadingInternalMovTypes, setIsLoadingInternalMovTypes] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingInternalMovTypes(true);
      const response = await UseCases.getInternalMovTypesUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar lista tipos movimiento interno",
        }
      );

      const dropdownInternalMovTypeResult = response.map((statusReq) => ({
        code: statusReq.code.toString(),
        name: statusReq.name,
      }));

      setInternalMovTypes(response);
      setDropdownInternalMovTypes(dropdownInternalMovTypeResult);
      setIsLoadingInternalMovTypes(false);
    })();
  }, []);

  return {
    internalMovTypes,
    isLoadingInternalMovTypes,
    dropdownInternalMovTypes,
  };
};

