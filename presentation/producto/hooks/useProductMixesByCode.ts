import { useMemo } from "react";
import { useProductsReqByCode } from "@/presentation/producto/hooks";

import { ProductMix, ProductReq } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";
import { COMPONENT_TYPE } from "@/config/constants";

export const useProductMixesByCode = (reqCode: string, reqType: number) => {
  const { queryProductsReq, totalKg } = useProductsReqByCode(
    Number(reqCode),
    String(reqType)
  );
  console.log(JSON.stringify(queryProductsReq.data, null, 2));

  const palletizingMixes = useMemo(() => {
    if (!queryProductsReq.data) return [];

    const grouped = new Map<string, ProductMix>();

    queryProductsReq.data.forEach((item: ProductReq) => {
      const key = `${item.batch}-${item.mixCode}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          batch: item.batch,
          mixCode: item.mixCode,
          mixName: item.mixName,
          packagingName: "",
          totalKg: 0,
          totalPackagingQuantity: 0,
          formattedTotalKg: "",
        });
      }

      const existing = grouped.get(key)!;
      existing.totalKg += item.kgProduct;
      existing.totalPackagingQuantity += item.quantity;
      if (item.componentType === COMPONENT_TYPE.envasado) {
        existing.packagingName = item.productName;
      }
    });

    const result = Array.from(grouped.values()).map((mix) => ({
      ...mix,
      formattedTotalKg: Formatter.numberWithDots(mix.totalKg),
    }));

    return result;
  }, [queryProductsReq.data]);

  return {
    palletizingMixes,
    isLoadingMixed: queryProductsReq.isLoading,
  };
};
