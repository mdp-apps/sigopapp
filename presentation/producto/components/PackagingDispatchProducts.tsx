import React, { useState } from "react";
import { Text } from "react-native-paper";

import { useVisibility } from "@/presentation/shared/hooks";

import {
  ThemedAccordion,
} from "@/presentation/theme/components";
import { ItemAccordionProduct, ModalProductDetail } from "./";

import { ProductReq } from "@/infrastructure/entities";
import { COMPONENT_TYPE } from "@/config/constants";

interface ProductosProps {
  productsPerBatch: { [key: string]: ProductReq[] };
}

export const PackagingDispatchProducts = ({
  productsPerBatch,
}: ProductosProps) => {
  const [modalProduct, setModalProduct] = useState<ProductReq>(
    {} as ProductReq
  );

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const handleModal = (product: ProductReq) => {
    setModalProduct(product);
    showModal();
  };

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
                    showModal={() => handleModal(product)}
                  />
                ) : (
                  <ItemAccordionProduct
                    key={product.codeDetailReq}
                    product={product}
                    icon="archive-check"
                    showModal={() => handleModal(product)}
                    isPackaging
                  />
                )
              )}
            </ThemedAccordion>
          ))}

          <ModalProductDetail
            product={modalProduct!}
            visibleModal={isVisibleModal}
            hideModal={hideModal}
          />
        </>
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
    </>
  );
};
