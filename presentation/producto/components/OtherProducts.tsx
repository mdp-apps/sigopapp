import React from "react";
import { ThemedAccordion, ThemedView } from "@/presentation/theme/components";
import { ItemAccordionProduct } from "./";

import { ProductReq } from "@/infrastructure/entities";
import { NoDataCard } from "@/presentation/shared/components";

interface ProductoOtrosProps {
  products: ProductReq[];
}

export const OtherProducts = ({ products }: ProductoOtrosProps) => {
  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <ThemedAccordion
            key={product.codeDetailReq}
            title={product.productName}
            titleStyle={{ fontSize: 16 }}
          >
            <ItemAccordionProduct product={product} />
          </ThemedAccordion>
        ))
      ) : (
        <ThemedView className="items-center justify-center">
          <NoDataCard
            message="No hay productos para este requerimiento"
            iconSource="alert-circle"
          />
        </ThemedView>
      )}
    </>
  );
};
