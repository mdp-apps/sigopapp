import React from "react";

import { Card, Divider } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedAccordion,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";

import { Stock } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";

interface BalanceCardProps {
  balance: Stock;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");
  const textColor = useThemeColor({}, "text");

  return (
    <ThemedAccordion
      title={`Op. ${balance.operationCode} - ${balance.operationName}`}
      description={`Cliente: ${balance.customerName} \t\t Bodega: ${balance.warehouseAbbr}`}
      titleStyle={{
        fontSize: 15,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        color: textColor,
      }}
      descriptionStyle={{
        fontSize: 14,
        fontFamily: "sans-serif",
        color: darkGrayColor,
        fontWeight: "bold",
      }}
    >
      <Card.Content>
        <ThemedText
          variant="h5"
          className="text-light-dark-gray uppercase font-semibold"
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {balance.productName}
        </ThemedText>

        <Divider className="my-3" />

        <ThemedView className="flex-row gap-2" bgColor="white">
          <ThemedText variant="h6" className="text-light-dark-gray font-bold">
            Cantidad disponible:
          </ThemedText>
          <ThemedText
            variant="h6"
            className="text-light-dark-gray font-semibold"
          >
            {Formatter.numberWithDots(balance.quantity)}
          </ThemedText>
        </ThemedView>
      </Card.Content>
    </ThemedAccordion>
  );
};
