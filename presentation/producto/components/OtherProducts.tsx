import React, { useState } from "react";
import { ThemedAccordion, ThemedText } from "@/presentation/theme/components";
import { ItemAccordionProduct, ModalProductDetail } from "./";

import { ProductReq } from "@/infrastructure/entities";

interface ProductoOtrosProps {
  products: ProductReq[];
}

export const OtherProducts = ({ products }: ProductoOtrosProps) => {
  const [visibleModalProduct, setVisibleModalProduct] = useState<number | null>(null);

  const showModal = (codeDetailReq: number) => {
    setVisibleModalProduct(codeDetailReq);
  };

  const hideModal = () => {
    setVisibleModalProduct(null);
  };

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
              showModal={() => showModal(product.codeDetailReq)}
            />

            <ModalProductDetail
              product={product}
              visibleModal={visibleModalProduct === product.codeDetailReq}
              hideModal={hideModal}
            />
          </ThemedAccordion>
        ))
      ) : (
        <ThemedText>No hay datos disponibles</ThemedText>
      )}
    </>
  );
};
