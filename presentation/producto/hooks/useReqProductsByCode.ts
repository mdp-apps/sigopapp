import { useEffect, useMemo, useState } from "react";

import * as UseCases from "@/core/producto/use-cases";
import { ProductReq } from "@/infrastructure/entities";

import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useProductsReqByCode = (reqCode: string, reqType: string) => {
  const [productsReq, setProductsReq] = useState<ProductReq[]>([]);
  const [isLoadingProductsReq, setIsLoadingProductsReq] = useState(false);

  const [productsPerBatch, setProductsPerBatch] = useState<{
    [key: string]: ProductReq[];
  }>({});

  const totalKg = useMemo(() => {
    return productsReq
      .map((data) => data.kgProduct)
      .reduce((total, kg) => total + kg, 0);
  }, [productsReq]);

  useEffect(() => {
    (async () => {
      setIsLoadingProductsReq(true);
      const response = await UseCases.getProductsReqByCodeUseCase(
        sigopApiFetcher,
        {
          accion: "Consultar productos requerimiento",
          requerimiento: reqCode,
          tipo_requerimiento: reqType,
        }
      );

      setProductsReq(response);
      setIsLoadingProductsReq(false);
    })();
  }, [reqCode, reqType]);

  useEffect(() => {
    const newProductsPerBatch: { [key: number]: ProductReq[] } = {};

    productsReq.forEach((product) => {
      if (!newProductsPerBatch[product.batch]) {
        newProductsPerBatch[product.batch] = [];
      }
      newProductsPerBatch[product.batch].push(product);
    });
    setProductsPerBatch(newProductsPerBatch);
  }, [productsReq]);

  return {
    productsReq,
    isLoadingProductsReq,
    totalKg,
    productsPerBatch,
  };
};
