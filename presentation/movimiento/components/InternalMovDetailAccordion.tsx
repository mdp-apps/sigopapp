import React from "react";

import { useThemeColor } from "@/presentation/theme/hooks";

import { ThemedAccordion } from "@/presentation/theme/components";

import { InternalMovDetail } from "@/infrastructure/entities";
import { Card } from "react-native-paper";
import { MovDetail } from "./MovDetail";

interface InternalMovDetailsProps {
  detail: InternalMovDetail;
}

export const InternalMovDetailsAccordion = ({
  detail,
}: InternalMovDetailsProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <ThemedAccordion
      title={`Cliente: ${detail.customerName}`}
      description={`${detail.warehouseCode} - ${detail.warehouseDestinyCode}`}
      titleStyle={{
        fontSize: 14,
        fontFamily: "sans-serif",
        textTransform: "uppercase",
        color: darkGrayColor,
      }}
      style={{
        backgroundColor: "white",
        borderBottomColor: darkGrayColor,
        borderBottomWidth: 0.5,
        paddingBottom: 0,
      }}
    >
      <Card.Content>
        <MovDetail detail={detail} />
      </Card.Content>
    </ThemedAccordion>
  );
};
