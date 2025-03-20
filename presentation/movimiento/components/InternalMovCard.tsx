import React from "react";

import {  View } from "react-native";
import { Card, Divider } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
import {
  ThemedAccordion,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";

import { InternalMovement } from "@/infrastructure/entities";
import { INTERNAL_MOV_STATUS_BG_COLOR } from "@/config/constants";
import { Formatter } from "@/config/helpers";

interface InternalMovCardProps {
  movement: InternalMovement;
}

export const InternalMovCard = ({ movement }: InternalMovCardProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <ThemedAccordion
      title={`Det. ${movement.detailId} - ${movement.productName}`}
      description={`Mov. ${movement.id} - ${movement.plannedDate} (T${movement.turn}) - ${movement.customerName}`}
      titleStyle={{
        fontSize: 14,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: darkGrayColor,
      }}
      descriptionStyle={{
        fontSize: 14,
        fontFamily: "sans-serif",
        color: darkGrayColor,
      }}
    >
      <Card.Content>
        <ThemedView className="gap-2" bgColor="white">
          <ThemedText
            variant="h5"
            className="text-light-dark-gray uppercase font-semibold"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {movement.movementTypeName}
          </ThemedText>

          <ThemedView
            className="flex-1 flex-row items-center gap-3"
            bgColor="white"
          >
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                <View
                  style={{
                    backgroundColor:
                      INTERNAL_MOV_STATUS_BG_COLOR[movement.status],
                    width: 12,
                    height: 12,
                  }}
                />
                <ThemedText
                  variant="h6"
                  className="text-gray-600 uppercase font-semibold"
                >
                  Estado:
                </ThemedText>
              </View>

              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                style={{ textTransform: "capitalize" }}
              >
                {movement.statusName}
              </ThemedText>
            </View>

            {movement.diCode && (
              <ThemedText
                variant="h6"
                className="text-gray-600 uppercase font-semibold"
              >
                DI: {movement.diCode}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        <Divider className="my-3" />

        <ThemedView className="flex-row mr-5" bgColor="white">
          <View className="flex-1 justify-center">
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
                Planificado KG:
              </ThemedText>
              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                adjustsFontSizeToFit
              >
                {Formatter.numberWithDots(movement.totalQuantityKG)}
              </ThemedText>
            </View>

            <View className="flex-row gap-2">
              <ThemedText
                variant="h6"
                className="text-gray-950 font-semibold"
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                Pendiente KG:
              </ThemedText>
              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                adjustsFontSizeToFit
              >
                {Formatter.numberWithDots(movement.pendingQuantityKG)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <Divider className="my-3" />

        <ThemedView className="flex-row  mr-5" bgColor="white">
          <View className="flex-1 justify-center">
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
                Verificado KG:
              </ThemedText>
              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                adjustsFontSizeToFit
              >
                {Formatter.numberWithDots(movement.verifiedQuantityKG)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </Card.Content>
    </ThemedAccordion>
  );
};