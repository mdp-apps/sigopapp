import React from "react";
import { View, ScrollView } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";

import {
  ThemedButton,
  ThemedText,
  ThemedTooltip,
} from "@/presentation/theme/components";

import { InternalMovDetail } from "@/infrastructure/entities";

interface MovDetailProps {
  detail: InternalMovDetail;
}

export const MovDetail = ({ detail }: MovDetailProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <>
      <ScrollView horizontal>
        <View className="flex-1  gap-2">
          <View className="flex-row items-center gap-2 pl-4">
            <ThemedText
              variant="h5"
              className="text-slate-800 uppercase font-semibold"
              adjustsFontSizeToFit
            >
              Bod:
            </ThemedText>

            <ThemedText
              variant="h5"
              className="text-gray-600 uppercase font-semibold"
              adjustsFontSizeToFit
            >
              {detail.warehouseName}
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
              {detail.warehouseDestinyName}
            </ThemedText>
          </View>

          <View className="flex-row items-center gap-2 pb-2 pl-4">
            <ThemedText
              variant="h5"
              className="text-slate-800 uppercase font-semibold"
              adjustsFontSizeToFit
            >
              Op:
            </ThemedText>

            <ThemedTooltip title="Op. origen">
              <ThemedText
                variant="h5"
                className="text-gray-600 uppercase font-semibold"
                adjustsFontSizeToFit
              >
                {detail.operationName}
              </ThemedText>
            </ThemedTooltip>

            <ThemedButton
              className="!p-0"
              variant="icon"
              iconName="arrow-right-thin"
              iconColor={darkGrayColor}
              iconSize={28}
            />

            <ThemedTooltip title="Op. destino" position="default">
              <ThemedText
                variant="h5"
                className="text-gray-600 uppercase font-semibold"
                adjustsFontSizeToFit
              >
                {detail.operationDestinyName}
              </ThemedText>
            </ThemedTooltip>
          </View>
        </View>
      </ScrollView>

      <View className="flex-1 gap-2 mt-2">
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
            {detail.totalQuantityKG}
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
            {detail.pendingQuantityKG}
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
            {detail.transferredQuantityKG}
          </ThemedText>
        </View>
      </View>
    </>
  );
};
