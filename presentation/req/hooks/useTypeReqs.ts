import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { TypeReq } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useTypeReqs = () => {
  const [typeReqs, setTypeReqs] = useState<TypeReq[]>([]);
  const [dropdownTypeReqs, setDropdownTypeReqs] = useState<DropdownResponse[]>([]);

  const [isLoadingTypeReqs, setIsLoadingTypeReqs] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTypeReqs(true);
      const response = await UseCases.getTypeRequirementsUseCase(sigopApiFetcher, {
        accion: "Consultar lista tipos requerimiento",
      });

       const dropdownTypeReqResult = response.map((typeReq) => ({
         code: typeReq.code.toString(),
         name: typeReq.name,
       }));

      setTypeReqs(response);
      setDropdownTypeReqs(dropdownTypeReqResult);
      setIsLoadingTypeReqs(false);
    })();
  }, []);

  return {
    typeReqs,
    isLoadingTypeReqs,
    dropdownTypeReqs,
  };
};

