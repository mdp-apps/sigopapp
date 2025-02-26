import { useEffect, useMemo, useState } from "react";

import * as UseCases from "@/core/producto/use-cases";
import { ProductReq } from "@/infrastructure/entities";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { useQuery } from "@tanstack/react-query";

export const useProductsReqByCode = (reqCode: string, reqType: string) => {
  // const [productsReq, setProductsReq] = useState<ProductReq[]>([]);
  // const [isLoadingProductsReq, setIsLoadingProductsReq] = useState(false);

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
  });

  const totalKg = useMemo(() => {
    return (
      queryProductsReq.data &&
      queryProductsReq.data
        .map((data) => data.kgProduct)
        .reduce((total, kg) => total + kg, 0)
    );
  }, [queryProductsReq.data]);

  // useEffect(() => {
  //   (async () => {
  //     setIsLoadingProductsReq(true);
  //     const response = await UseCases.getProductsReqByCodeUseCase(
  //       sigopApiFetcher,
  //       {
  //         accion: "Consultar productos requerimiento",
  //         requerimiento: reqCode,
  //         tipo_requerimiento: reqType,
  //       }
  //     );

  //     setProductsReq(response);
  //     setIsLoadingProductsReq(false);
  //   })();
  // }, [reqCode, reqType]);

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
  }, [queryProductsReq]);

  return {
    queryProductsReq,
    totalKg: totalKg!,
    productsPerBatch,
  };
};
