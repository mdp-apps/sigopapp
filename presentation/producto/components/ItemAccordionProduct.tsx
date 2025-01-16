import React from "react";
import { List } from "react-native-paper";

import { ThemedText } from "@/presentation/theme/components";

import { ProductReq } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";
import { Colors } from "@/config/constants";

interface ItemAccordionProductProps {
  product: ProductReq;
  showModal: () => void;
  icon?: string;
  isPackaging?: boolean;
}

export const ItemAccordionProduct = ({
  product,
  showModal,
  icon = "asterisk",
  isPackaging = false,
}: ItemAccordionProductProps) => {
  return (
    <List.Item
      title={
        <>
          <ThemedText variant="h6" className="font-ruda">
            {product.productName}:{" "}
          </ThemedText>

          <ThemedText variant="semi-bold" style={{ fontFamily: "Ruda-Bold" }}>
            {isPackaging
              ? `${Formatter.numberWithDots(product.quantity)} UN.`
              : `${Formatter.numberWithDots(product.kgProduct)} KG.`}
          </ThemedText>
        </>
      }
      left={(props) => <List.Icon {...props} icon={icon} />}
      style={{ backgroundColor: Colors.light.quaternary, paddingLeft: 10 }}
      onPress={showModal}
    />
  );
};
