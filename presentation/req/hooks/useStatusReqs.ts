import { useEffect, useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { StatusReq } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useStatusReqs = () => {
  const [statusReqs, setStatusReqs] = useState<StatusReq[]>([]);
  const [dropdownStatusReqs, setDropdownStatusReqs] = useState<DropdownResponse[]>([]);

  const [isLoadingStatusReqs, setIsLoadingStatusReqs] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingStatusReqs(true);
      const response = await UseCases.getStatusRequirementsUseCase(sigopApiFetcher, {
        accion: "Consultar estados requerimiento",
      });

       const dropdownStatusReqResult = response.map((statusReq) => ({
         code: statusReq.code.toString(),
         name: statusReq.name,
       }));

      setStatusReqs(response);
      setDropdownStatusReqs(dropdownStatusReqResult);
      setIsLoadingStatusReqs(false);
    })();
  }, []);

  return {
    statusReqs,
    isLoadingStatusReqs,
    dropdownStatusReqs,
  };
};

