
import { useMemo } from "react";
import { useProductsReqByCode } from "@/presentation/producto/hooks";

import { PalletizingMix, ProductReq } from "@/infrastructure/entities";


export const usePalletizingMixesByCode = (reqCode: string, reqType: string) => {
  const { queryProductsReq } = useProductsReqByCode(reqCode, reqType);

  const palletizingMixes = useMemo(() => {
    if (!queryProductsReq.data) return [];

    const grouped = new Map<string, PalletizingMix>();

    queryProductsReq.data.forEach((item: ProductReq) => {
      const key = `${item.batch}-${item.mixCode}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          batch: item.batch,
          mixCode: item.mixCode,
          mixName: item.mixName,
          totalKg: 0,
        });
      }

      const existing = grouped.get(key)!;
      existing.totalKg += item.kgProduct;
    });

    return Array.from(grouped.values());
  }, [queryProductsReq.data]);

  return {
    palletizingMixes,
    isLoadingMixed: queryProductsReq.isLoading,
  };
};