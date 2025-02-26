import React from "react";

import { ThemedAccordion, ThemedText } from "@/presentation/theme/components";
import { ItemAccordionProduct } from "./";

import { ProductReq } from "@/infrastructure/entities";
import { COMPONENT_TYPE } from "@/config/constants";

interface ProductosProps {
  productsPerBatch: { [key: string]: ProductReq[] };
}

export const PackagingDispatchProducts = ({
  productsPerBatch,
}: ProductosProps) => {
  return (
    <>
      {Object.keys(productsPerBatch).length > 0 ? (
        <>
          {Object.keys(productsPerBatch).map((batch) => (
            <ThemedAccordion
              key={batch}
              title={`Lote ${batch}`}
              description={productsPerBatch[batch][0].mixName}
            >
              {productsPerBatch[batch].map((product) =>
                product.componentType === COMPONENT_TYPE.fertilizante ? (
                  <ItemAccordionProduct
                    key={product.codeDetailReq}
                    product={product}
                  />
                ) : (
                  <ItemAccordionProduct
                    key={product.codeDetailReq}
                    product={product}
                    icon="archive-check"
                    isPackaging
                  />
                )
              )}
            </ThemedAccordion>
          ))}
        </>
      ) : (
        <ThemedText className="text-xl font-semibold">
          No hay datos disponibles
        </ThemedText>
      )}
    </>
  );
};
