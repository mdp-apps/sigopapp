import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { useVisibility } from "@/presentation/shared/hooks";

import {
  ThemedChip,
  ThemedSnackbar,
  ThemedText,
} from "@/presentation/theme/components";
import { AccordionProduct, ItemAccordionProduct, ModalProductDetail } from "./";

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

  const { isVisible: isVisibleSnackbar, hide: hideSnackbar } = useVisibility();

  const handleModal = (product: ProductReq) => {
    setModalProduct(product);
    showModal();
  };

  return (
    <>
      {Object.keys(productsPerBatch).length > 0 ? (
        Object.keys(productsPerBatch).map((batch) => (
          <AccordionProduct
            key={batch}
            accordionTitle={
              <View className="flex-row items-center gap-3">
                <ThemedChip
                  mode="outlined"
                  text={`Lote ${batch}`}
                  style={{ backgroundColor: "white" }}
                />

                <ThemedText variant="h6" className="font-ruda w-5/6">
                  {productsPerBatch[batch][0].mixName}
                </ThemedText>
              </View>
            }
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
                  icon="assistant"
                  showModal={() => handleModal(product)}
                  isPackaging
                />
              )
            )}

            <ModalProductDetail
              product={modalProduct!}
              visibleModal={isVisibleModal}
              hideModal={hideModal}
            />
          </AccordionProduct>
        ))
      ) : (
        <Text>No hay datos disponibles</Text>
      )}

      <ThemedSnackbar
        visible={isVisibleSnackbar}
        onDismiss={hideSnackbar}
        message="Producto actualizado correctamente"
        duration={3000}
      />
    </>
  );
};
