import React from "react";
import { View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";

import { ThemedButton, ThemedText } from "@/presentation/theme/components";
import { MovDetail } from "./MovDetail";

import { InternalMovDetail } from "@/infrastructure/entities";

interface InternalMovDetailsProps {
  detail: InternalMovDetail;
}

export const InternalMovDetails = ({ detail }: InternalMovDetailsProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <View>
      <View className="flex-row items-center gap-2 mb-2">
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
          {detail.customerName}
        </ThemedText>
      </View>
      <MovDetail detail={detail} />
    </View>
  );
};
