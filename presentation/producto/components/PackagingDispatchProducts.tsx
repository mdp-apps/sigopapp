import React from "react";

import { ThemedAccordion, ThemedView } from "@/presentation/theme/components";
import { ItemAccordionProduct } from "./";

import { ProductReq } from "@/infrastructure/entities";
import { COMPONENT_TYPE } from "@/config/constants";
import { NoDataCard } from "@/presentation/shared/components";

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
