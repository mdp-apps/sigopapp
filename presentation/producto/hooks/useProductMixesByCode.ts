
import { useMemo } from "react";
import { useProductsReqByCode } from "@/presentation/producto/hooks";

import { ProductMix, ProductReq } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";


export const useProductMixesByCode = (reqCode: string, reqType: number) => {
  const { queryProductsReq, totalKg } = useProductsReqByCode(
    Number(reqCode),
    String(reqType)
  );

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
          // packagingName: item.productName,
          totalKg: 0,
          totalPackagingQuantity: 0,
          formattedTotalKg: "",
        });
      }

      const existing = grouped.get(key)!;
      existing.totalKg += item.kgProduct;
      existing.totalPackagingQuantity += item.quantity;
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