import React from "react";

import {  View } from "react-native";
import { Card, Divider } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedAccordion,
  ThemedText,
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
        description={`${movement.customerName} - T${movement.turn}`}
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
          textTransform: "uppercase",
        }}
      >
        <Card.Content>
          <Divider
            style={{
              backgroundColor: darkGrayColor,
              marginVertical: 15,
            }}
          />

          <ThemedView className="flex-row w-full" bgColor="white">
            <View className="justify-center w-2/6">
              <ThemedText
                variant="h5"
                className="text-light-dark-gray uppercase font-bold"
                adjustsFontSizeToFit
              >
                Origen
              </ThemedText>
            </View>

            <View className="flex-1 gap-2">
              <ThemedText
                variant="h5"
                className="text-gray-600 uppercase font-semibold"
                adjustsFontSizeToFit
              >
                {movement.warehouseName}
              </ThemedText>

              <View>
                <ThemedText
                  variant="h6"
                  className="text-gray-950 font-semibold"
                  adjustsFontSizeToFit
                >
                  Operación:
                </ThemedText>

                <ThemedText
                  variant="h6"
                  className="flex-1 text-light-dark-gray uppercase"
                  adjustsFontSizeToFit
                >
                  {movement.operationName}
                </ThemedText>
              </View>

              <View className="flex-row gap-2">
                <ThemedText
                  variant="h6"
                  className="text-gray-950 font-semibold"
                  adjustsFontSizeToFit
                >
                  Planificado:
                </ThemedText>
                <ThemedText
                  variant="h6"
                  className="text-gray-600 font-semibold"
                  adjustsFontSizeToFit
                >
                  {Formatter.numberWithDots(movement.totalQuantityKG)} KG
                </ThemedText>
              </View>

              <View className="flex-row gap-2">
                <ThemedText
                  variant="h6"
                  className="text-gray-950 font-semibold"
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  Pendiente:
                </ThemedText>
                <ThemedText
                  variant="h6"
                  className="text-gray-600 font-semibold"
                  adjustsFontSizeToFit
                >
                  {Formatter.numberWithDots(movement.pendingQuantityKG)} KG
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          <ThemedView className="flex-row w-full mt-5" bgColor="white">
            <View className="justify-center w-2/6">
              <ThemedText
                variant="h5"
                className=" text-light-dark-gray uppercase font-bold"
                adjustsFontSizeToFit
              >
                Destino
              </ThemedText>
            </View>

            <View className="flex-1 gap-2">
              <ThemedText
                variant="h5"
                className="text-gray-600 uppercase font-semibold"
                adjustsFontSizeToFit
              >
                {movement.warehouseDestinyName}
              </ThemedText>

              <View>
                <ThemedText
                  variant="h6"
                  className="text-gray-950 font-semibold"
                  adjustsFontSizeToFit
                >
                  Operación:
                </ThemedText>
                <ThemedText
                  variant="h6"
                  className="flex-1 text-light-dark-gray uppercase"
                  adjustsFontSizeToFit
                >
                  {movement.operationDestinyName}
                </ThemedText>
              </View>

              <View className="flex-row gap-2">
                <ThemedText
                  variant="h6"
                  className="text-gray-950 font-semibold"
                  adjustsFontSizeToFit
                >
                  Trasladado:
                </ThemedText>
                <ThemedText
                  variant="h6"
                  className="text-gray-600 font-semibold"
                  adjustsFontSizeToFit
                >
                  {Formatter.numberWithDots(movement.transferredQuantityKG)} KG
                </ThemedText>
              </View>
            </View>
          </ThemedView>
        </Card.Content>
      </ThemedAccordion>
     </ThemedView>
  );
};