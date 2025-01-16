import { useEffect, useState } from "react";

import * as UseCases from "@/core/producto/use-cases";

import { Product } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [dropdownProducts, setDropdownProducts] = useState<DropdownResponse[]>([]);

  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingProducts(true);
      const response = await UseCases.getProductsUseCase(sigopApiFetcher, {
        accion: "Consultar lista productos",
      });

       const dropdownTurnResult = response.map((product) => ({
         code: product.code.toString(),
         name: `[${product.customerCode}] - ${product.name}`,
       }));

      setProducts(response);
      setDropdownProducts(dropdownTurnResult);
      setIsLoadingProducts(false);
    })();
  }, []);

  return {
    products,
    isLoadingProducts,
    dropdownProducts,
  };
};

