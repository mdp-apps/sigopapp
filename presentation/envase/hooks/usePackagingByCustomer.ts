import { useEffect, useState } from "react";

import * as UseCases from "@/core/envase/use-cases";

import { Packaging } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const usePackagingByCustomer = (customerCode: number) => {
  const [packaging, setPackaging] = useState<Packaging[]>([]);
  const [dropdownPackaging, setDropdownPackaging] = useState<DropdownResponse[]>([]);

  const [isLoadingPackaging, setIsLoadingPackaging] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingPackaging(true);
      const response = await UseCases.getPackagingByCustomerUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar lista envases",
          cliente: customerCode,
        }
      );

      const dropdownPackagingResult = response.map((pack) => ({
        code: pack.code.toString(),
        name: pack.name,
      }));

      setPackaging(response);
      setDropdownPackaging(dropdownPackagingResult);
      setIsLoadingPackaging(false);
    })();
  }, [customerCode]);

  return {
    packaging,
    isLoadingPackaging,
    dropdownPackaging,
  };
};
