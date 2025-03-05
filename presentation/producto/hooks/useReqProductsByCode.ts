import { useEffect, useMemo, useState } from "react";

import * as UseCases from "@/core/producto/use-cases";
import { ProductReq } from "@/infrastructure/entities";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useQuery } from "@tanstack/react-query";

export const useProductsReqByCode = (reqCode: number, reqType: string) => {
  const [productsPerBatch, setProductsPerBatch] = useState<{
    [key: string]: ProductReq[];
  }>({});

  const queryProductsReq = useQuery({
    queryKey: ["products-req", reqCode, reqType],
    queryFn: () =>
      UseCases.getProductsReqByCodeUseCase(sigopApiFetcher, {
        accion: "Consultar productos requerimiento",
        requerimiento: reqCode,
        tipo_requerimiento: reqType,
      }),
    enabled: !!reqCode && !!reqType,
    staleTime: 1000 * 60 * 5,
  });


  const totalKg = useMemo(() => {
    return (
      queryProductsReq.data &&
      queryProductsReq.data
        .map((data) => data.kgProduct)
        .reduce((total, kg) => total + kg, 0)
    );
  }, [queryProductsReq.data]);

  useEffect(() => {
    const newProductsPerBatch: { [key: number]: ProductReq[] } = {};

    if (queryProductsReq.data) {
      queryProductsReq.data.forEach((product) => {
        if (!newProductsPerBatch[product.batch]) {
          newProductsPerBatch[product.batch] = [];
        }
        newProductsPerBatch[product.batch].push(product);
      });
    }

    setProductsPerBatch(newProductsPerBatch);
  }, [queryProductsReq.data]);

  return {
    queryProductsReq,
    totalKg: totalKg!,
    productsPerBatch,
  };
};
