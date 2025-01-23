import React from "react";
import { ThemedText } from "@/presentation/theme/components";
import { AccordionProduct, ItemAccordionProduct, ModalProductDetail } from "./";

import { ProductReq } from "@/infrastructure/entities";
import { useVisibility } from "@/presentation/shared/hooks";

interface ProductoOtrosProps {
  products: ProductReq[];
}

export const OtherProducts = ({ products }: ProductoOtrosProps) => {
  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

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
            <ItemAccordionProduct product={product} showModal={showModal} />

            <ModalProductDetail
              product={product}
              visibleModal={isVisibleModal}
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
