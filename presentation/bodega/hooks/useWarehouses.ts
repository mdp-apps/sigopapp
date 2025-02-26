import { useEffect, useState } from "react";

import * as UseCases from "@/core/bodega/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { CustomerCompany } from "@/config/constants";

import { useQuery } from "@tanstack/react-query";

export const useWarehouses = () => {
  const [dropdownWarehouses, setDropdownWarehouses] = useState<
    DropdownResponse[]
  >([]);

  const queryWarehouses = useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => {
      const response = await UseCases.getWarehousesUseCase(sigopApiFetcher, {
        accion: "Consultar lista bodegas",
        cliente: CustomerCompany.mdp,
      });
      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryWarehouses.isSuccess) {
      const shortWarehousesResult = queryWarehouses.data.map((warehouse) => ({
        code: warehouse.code.toString(),
        name: `[${warehouse.abbrName}] - ${warehouse.name}`,
      }));
  
      setDropdownWarehouses(shortWarehousesResult);
    }
  }, [queryWarehouses.isSuccess]);

  return {
    queryWarehouses,
    dropdownWarehouses,
  };
};
