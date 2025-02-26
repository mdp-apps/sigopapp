import { useEffect, useState } from "react";

import * as UseCases from "@/core/envase/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const usePackagingByCustomer = (customerCode: number) => {
  const [dropdownPackaging, setDropdownPackaging] = useState<DropdownResponse[]>([]);

  const queryPackagingByCustomer = useQuery({
    queryKey: ["packaging-customer", customerCode],
    queryFn: async () => {
      const response = await UseCases.getPackagingByCustomerUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar lista envases",
          cliente: customerCode,
        }
      );
      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryPackagingByCustomer.isSuccess) {
     const dropdownPackagingResult = queryPackagingByCustomer.data.map((pack) => ({
       code: pack.code.toString(),
       name: pack.name,
     }));

     setDropdownPackaging(dropdownPackagingResult);
    }
  }, [queryPackagingByCustomer.isSuccess]);


  return {
    queryPackagingByCustomer,
    dropdownPackaging,
  };
};
