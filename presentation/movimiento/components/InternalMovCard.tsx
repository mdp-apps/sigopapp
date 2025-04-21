import React from "react";

import { View } from "react-native";
import { Card } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedAccordion,
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { InternalMovDetails, InternalMovDetailsAccordion } from "./";

import { InternalMov } from "@/infrastructure/entities";

interface InternalMovCardProps {
  movement: InternalMov;
}

export const InternalMovCard = ({ movement }: InternalMovCardProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <ThemedView className="mb-3">
      <ThemedAccordion
        title={`${movement.productName}`}
        titleStyle={{
          fontSize: 14,
          fontFamily: "sans-serif",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: darkGrayColor,
        }}
      >
        <Card.Content>
          {movement.details.length > 1 && (
            <>
              <View className="flex-1 gap-2 mt-2">
                <View className="flex-row items-center gap-2">
                  <ThemedButton
                    className="!p-0"
                    variant="icon"
                    iconName="arrow-right-drop-circle"
                    iconColor={darkGrayColor}
                    iconSize={20}
                  />

                  <ThemedText
                    variant="h5"
                    className="text-gray-950 uppercase font-semibold"
                    adjustsFontSizeToFit
                  >
                    Planificado:
                  </ThemedText>
                  <ThemedText
                    variant="h5"
                    className="text-gray-600 font-semibold"
                    adjustsFontSizeToFit
                  >
                    {movement.totalQuantityKG}
                  </ThemedText>
                </View>

                <View className="flex-row items-center gap-2">
                  <ThemedButton
                    className="!p-0"
                    variant="icon"
                    iconName="arrow-right-drop-circle"
                    iconColor={darkGrayColor}
                    iconSize={20}
                  />

                  <ThemedText
                    variant="h5"
                    className="text-gray-950 uppercase font-semibold"
                    adjustsFontSizeToFit
                  >
                    Pendiente:
                  </ThemedText>
                  <ThemedText
                    variant="h5"
                    className="text-gray-600 font-semibold"
                    adjustsFontSizeToFit
                  >
                    {movement.pendingQuantityKG}
                  </ThemedText>
                </View>

                <View className="flex-row items-center gap-2">
                  <ThemedButton
                    className="!p-0"
                    variant="icon"
                    iconName="arrow-right-drop-circle"
                    iconColor={darkGrayColor}
                    iconSize={20}
                  />

                  <ThemedText
                    variant="h5"
                    className="text-gray-950 uppercase font-semibold"
                    adjustsFontSizeToFit
                  >
                    Trasladado:
                  </ThemedText>
                  <ThemedText
                    variant="h5"
                    className="text-gray-600 font-semibold"
                    adjustsFontSizeToFit
                  >
                    {movement.transferredQuantityKG}
                  </ThemedText>
                </View>
              </View>
            </>
          )}
          

          {movement.details.map((detail, index) =>
            movement.details.length > 1 ? (
              <InternalMovDetailsAccordion
                key={`${detail.operationName}${detail.customerName}`}
                detail={detail}
              />
            ) : (
              <InternalMovDetails
                key={`${detail.operationName}${detail.customerName}`}
                detail={detail}
              />
            )
          )}
        </Card.Content>
      </ThemedAccordion>
    </ThemedView>
  );
};
