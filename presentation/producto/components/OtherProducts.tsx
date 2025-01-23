import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components";
import { AccordionProduct, ItemAccordionProduct, ModalProductDetail } from "./";

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
          <AccordionProduct
            key={product.codeDetailReq}
            accordionTitle={
              <ThemedText variant="h6" className="font-ruda">
                {product.productName}
              </ThemedText>
            }
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
          </AccordionProduct>
        ))
      ) : (
        <ThemedText>No hay datos disponibles</ThemedText>
      )}
    </>
  );
};
