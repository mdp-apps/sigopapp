import React from "react";

import { View } from "react-native";
import { Card, Divider } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedAccordion,
  ThemedButton,
  ThemedText,
  ThemedTooltip,
  ThemedView,
} from "@/presentation/theme/components";

import { InternalMov } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";

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
        descriptionStyle={{
          fontSize: 15,
          fontFamily: "sans-serif",
          color: darkGrayColor,
        }}
      >
        <Card.Content>
          <View className="flex-row items-center gap-2">
            <ThemedButton
              className="!p-0"
              variant="icon"
              iconName="checkbox-blank-circle"
              iconColor={darkGrayColor}
              iconSize={8}
            />

            <ThemedText
              variant="h5"
              className="text-gray-950 uppercase font-semibold"
              adjustsFontSizeToFit
            >
              Cliente:
            </ThemedText>
            <ThemedText
              variant="h5"
              className="text-gray-600 font-semibold"
              adjustsFontSizeToFit
            >
              {movement.customerName}
            </ThemedText>
          </View>

          <Divider
            style={{
              backgroundColor: darkGrayColor,
              marginVertical: 15,
            }}
          />

          <View className="flex-1 gap-2">
            <View className="flex-row items-center gap-2">
              <ThemedText
                variant="h5"
                className="text-gray-600 uppercase font-semibold"
                adjustsFontSizeToFit
              >
                {movement.warehouseName}
              </ThemedText>

              <ThemedButton
                className="!p-0"
                variant="icon"
                iconName="arrow-right-thin"
                iconColor={darkGrayColor}
                iconSize={28}
              />

              <ThemedText
                variant="h5"
                className="text-gray-600 uppercase font-semibold"
                adjustsFontSizeToFit
              >
                {movement.warehouseDestinyName}
              </ThemedText>
            </View>

            <View className="flex-row items-center gap-2">
              <ThemedTooltip title="Operación origen">
                <ThemedText
                  variant="h5"
                  className="text-gray-600 uppercase font-semibold"
                  adjustsFontSizeToFit
                >
                  {movement.operationName}
                </ThemedText>
              </ThemedTooltip>

              <ThemedButton
                className="!p-0"
                variant="icon"
                iconName="arrow-right-thin"
                iconColor={darkGrayColor}
                iconSize={28}
              />

              <ThemedTooltip title="Operación destino">
                <ThemedText
                  variant="h5"
                  className="text-gray-600 uppercase font-semibold"
                  adjustsFontSizeToFit
                >
                  {movement.operationDestinyName}
                </ThemedText>
              </ThemedTooltip>
            </View>
          </View>

          <Divider
            style={{
              backgroundColor: darkGrayColor,
              marginVertical: 15,
            }}
          />

          <View className="flex-1  gap-2">
            <View className="flex-row items-center gap-2">
              <ThemedButton
                className="!p-0"
                variant="icon"
                iconName="checkbox-blank-circle"
                iconColor={darkGrayColor}
                iconSize={8}
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
                {Formatter.numberWithDots(movement.totalQuantityKG)} KG
              </ThemedText>
            </View>

            <View className="flex-row items-center gap-2">
              <ThemedButton
                className="!p-0"
                variant="icon"
                iconName="checkbox-blank-circle"
                iconColor={darkGrayColor}
                iconSize={8}
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
                {Formatter.numberWithDots(movement.pendingQuantityKG)} KG
              </ThemedText>
            </View>

            <View className="flex-row items-center gap-2">
              <ThemedButton
                className="!p-0"
                variant="icon"
                iconName="checkbox-blank-circle"
                iconColor={darkGrayColor}
                iconSize={8}
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
                {Formatter.numberWithDots(movement.transferredQuantityKG)} KG
              </ThemedText>
            </View>
          </View>
        </Card.Content>
      </ThemedAccordion>
    </ThemedView>
  );
};
