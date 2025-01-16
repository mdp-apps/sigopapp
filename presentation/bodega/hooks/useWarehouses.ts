import { useEffect, useState } from "react";

import * as UseCases from "@/core/bodega/use-cases";

import { WareHouse } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";
import { DropdownResponse } from "@/infrastructure/interfaces";

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState<WareHouse[]>([]);
  const [dropdownWarehouses, setDropdownWarehouses] = useState<DropdownResponse[]>([]);
  
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);


  useEffect(() => {
    (async () => {
      setIsLoadingWarehouses(true);
      const response = await UseCases.getWarehousesUseCase(sigopApiFetcher, {
        accion: "Consultar lista bodegas",
        cliente: 1,
      });

      const shortWarehousesResult = response.map((warehouse) => ({
        code: warehouse.code.toString(),
        name: `[${warehouse.abbrName}] - ${warehouse.name}`,
      }));

      setWarehouses(response);
      setDropdownWarehouses(shortWarehousesResult);

      setIsLoadingWarehouses(false);
    })();
  }, []);

  return {
    warehouses,
    dropdownWarehouses,
    isLoadingWarehouses,
  };
};
