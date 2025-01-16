import { useEffect, useState } from "react";

import * as UseCases from "@/core/cliente/use-cases";

import { Customer } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [dropdownCustomers, setDropdownCustomers] = useState<
    DropdownResponse[]
  >([]);

  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingCustomers(true);
      const response = await UseCases.getCustomersUseCase(sigopApiFetcher, {
        accion: "Consultar clientes",
      });

       const dropdownCustomerResult = response.map((customer) => ({
         code: customer.code.toString(),
         name: `${customer.code} - ${customer.name}`,
       }));

      setCustomers(response);
      setDropdownCustomers(dropdownCustomerResult);
      setIsLoadingCustomers(false);
    })();
  }, []);

  return {
    customers,
    isLoadingCustomers,
    dropdownCustomers,
  };
};
