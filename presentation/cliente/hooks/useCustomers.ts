import { useEffect, useState } from "react";

import * as UseCases from "@/core/cliente/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  const [dropdownCustomers, setDropdownCustomers] = useState<
    DropdownResponse[]
    >([]);
  
  const queryCustomers = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await UseCases.getCustomersUseCase(sigopApiFetcher, {
        accion: "Consultar clientes",
      });
      return response;
    },
    staleTime: 1000 * 60 * 60,
  });


  useEffect(() => {
    if (queryCustomers.isSuccess) {
      const dropdownCustomerResult = queryCustomers.data?.map((customer) => ({
        code: customer.code.toString(),
        name: `${customer.code} - ${customer.name}`,
      }));

      setDropdownCustomers(dropdownCustomerResult);
    }
  }, [queryCustomers.isSuccess]);

  return {
    queryCustomers,
    dropdownCustomers,
  };
};
