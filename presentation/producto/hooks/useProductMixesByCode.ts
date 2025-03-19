import { useMemo } from "react";
import { useProductsReqByCode } from "@/presentation/producto/hooks";

import { ProductMix, ProductReq } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";
import { COMPONENT_TYPE } from "@/config/constants";

export const useProductMixesByCode = (reqCode: number, reqType: number) => {
  const { queryProductsReq } = useProductsReqByCode(reqCode, reqType);

  const productMixes = useMemo(() => {
    if (!queryProductsReq.data) return [];

    const grouped = new Map<string, ProductMix>();

    queryProductsReq.data.forEach((item: ProductReq) => {
      const key = `${item.batch}-${item.mixCode}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          batch: item.batch,
          codeDetailReq: 0,
          mixCode: item.mixCode,
          mixName: item.mixName,
          packagingName: "",
          productCode:  "",
          totalKg: 0,
          totalPackagingQuantity: 0,
          formattedTotalKg: "",
        });
      }

      const existing = grouped.get(key)!;
      existing.totalKg += item.kgProduct;
      existing.totalPackagingQuantity += item.quantity;

      if (item.componentType === COMPONENT_TYPE.envasado) {
        existing.codeDetailReq = item.codeDetailReq;
        existing.packagingName = item.productName;
        existing.productCode = item.codeProduct;
      }
    });

    const result = Array.from(grouped.values()).map((mix) => ({
      ...mix,
      formattedTotalKg: Formatter.numberWithDots(mix.totalKg),
    }));

    return result;
  }, [queryProductsReq.data]);

  const totalKgProductMixes = useMemo(() => {
    return productMixes.reduce((total, mix) => total + mix.totalKg, 0);
  }, [productMixes]);

  const totalPackagingQuantity = useMemo(() => {
    return productMixes.reduce((total, mix) => total + mix.totalPackagingQuantity, 0);
  }, [productMixes]);
  

  return {
    productMixes,
    isLoadingMixed: queryProductsReq.isLoading,
    totalKgProductMixes,
    totalPackagingQuantity,
  };
};
