import { useEffect, useState } from "react";

import * as UseCases from "@/core/producto/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const [dropdownProducts, setDropdownProducts] = useState<DropdownResponse[]>([]);

  const queryProducts = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await UseCases.getProductsUseCase(sigopApiFetcher, {
        accion: "Consultar lista productos",
      });

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });


  useEffect(() => {
    if (queryProducts.isSuccess) {
      const dropdownTurnResult = queryProducts.data.map((product) => ({
        code: product.code.toString(),
        name: `[${product.customerCode}] - ${product.name}`,
      }));

      setDropdownProducts(dropdownTurnResult);
    }
  }, [queryProducts.isSuccess]);

  return {
    queryProducts,
    dropdownProducts,
  };
};

