import React from "react";
import { Divider } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
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
  const primaryColor = useThemeColor({}, "primary");

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
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
        />
      )}

      {product.codeDetailReq && product.codeDetailReq !== 0 && (
        <ThemedChip
          tooltipTitle={String(product.codeDetailReq)}
          text={`Código Detalle: ${product.codeDetailReq}`}
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
        />
      )}

      {product.operationCode &&
        product.operationCode !== 0 &&
        product.operationName && (
          <ThemedChip
            tooltipTitle={`${product.operationCode} - ${product.operationName}`}
            text={`Operación: ${product.operationCode} - ${product.operationName}`}
            style={{ backgroundColor: primaryColor }}
            textStyle={{ color: "white" }}
            iconColor="white"
          />
        )}

      {product.abbrWarehouse && (
        <ThemedChip
          tooltipTitle={product.abbrWarehouse}
          text={`Bodega: ${product.abbrWarehouse}`}
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
        />
      )}

      {product.abbrPlant && (
        <ThemedChip
          tooltipTitle={product.abbrPlant}
          text={`Planta: ${product.abbrPlant}`}
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
        />
      )}

      {product.ballotCode !== 0 && (
        <ThemedChip
          tooltipTitle={String(product.ballotCode)}
          text={`Papeleta: ${product.ballotCode}`}
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
        />
      )}

      {product.codeDI && (
        <ThemedChip
          tooltipTitle={String(product.codeDI)}
          text={`DI: ${product.codeDI}`}
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
        />
      )}

      {product.observation && (
        <ThemedChip
          tooltipTitle={product.observation}
          text={`Observación: ${product.observation}`}
          style={{ backgroundColor: primaryColor }}
          textStyle={{ color: "white" }}
          iconColor="white"
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
