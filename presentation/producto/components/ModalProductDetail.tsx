import React from "react";
import { Divider } from "react-native-paper";

import {
  ThemedChip,
  ThemedModal,
  ThemedText,
} from "@/presentation/theme/components";

import { ProductReq } from "@/infrastructure/entities";

interface ModalProductDetailProps {
  children?: React.ReactNode;
  visibleModal: boolean;
  hideModal: () => void;
  product: ProductReq;
}

export const ModalProductDetail = ({
  children,
  product,
  visibleModal,
  hideModal,
}: ModalProductDetailProps) => {
  return (
    <ThemedModal isVisible={visibleModal} hideModal={hideModal} isNativeModal>
      {product.productName && (
        <ThemedText variant="h5">{product.productName}</ThemedText>
      )}
      <Divider className="mb-3" />

      {(product.mixCode || product.mixName) && (
        <ThemedChip
          tooltipTitle={`${product.mixCode ? `${product.mixCode} -` : ""} ${
            product.mixName
          }`}
          text={`Mezcla: ${product.mixCode ? `${product.mixCode} -` : ""} ${
            product.mixName
          }`}
        />
      )}

      {product.codeDetailReq && product.codeDetailReq !== 0 && (
        <ThemedChip
          tooltipTitle={String(product.codeDetailReq)}
          text={`Código Detalle: ${product.codeDetailReq}`}
        />
      )}

      {product.operationCode &&
        product.operationCode !== 0 &&
        product.operationName && (
          <ThemedChip
            tooltipTitle={`${product.operationCode} - ${product.operationName}`}
            text={`Operación: ${product.operationCode} - ${product.operationName}`}
          />
        )}

      {product.abbrWarehouse && (
        <ThemedChip
          tooltipTitle={product.abbrWarehouse}
          text={`Bodega: ${product.abbrWarehouse}`}
        />
      )}

      {product.abbrPlant && (
        <ThemedChip
          tooltipTitle={product.abbrPlant}
          text={`Planta: ${product.abbrPlant}`}
        />
      )}

      {product.ballotCode !== 0 && (
        <ThemedChip
          tooltipTitle={String(product.ballotCode)}
          text={`Papeleta: ${product.ballotCode}`}
        />
      )}

      {product.codeDI && (
        <ThemedChip
          tooltipTitle={String(product.codeDI)}
          text={`DI: ${product.codeDI}`}
        />
      )}

      {product.observation && (
        <ThemedChip
          tooltipTitle={product.observation}
          text={`Observación: ${product.observation}`}
        />
      )}

      {children && (
        <>
          <Divider className="mb-3" />
          {children}
        </>
      )}
    </ThemedModal>
  );
};
