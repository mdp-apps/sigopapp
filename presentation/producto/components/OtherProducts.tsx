import React from "react";
import { ThemedAccordion, ThemedText } from "@/presentation/theme/components";
import { ItemAccordionProduct } from "./";

import { ProductReq } from "@/infrastructure/entities";

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
            titleStyle={{fontSize: 16}}
          >
            <ItemAccordionProduct
              product={product}
            />


          </ThemedAccordion>
        ))
      ) : (
        <ThemedText>No hay datos disponibles</ThemedText>
      )}
    </>
  );
};
