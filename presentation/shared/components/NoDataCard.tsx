import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-paper";

import { TextType, ThemedCard, ThemedText } from "@/presentation/theme/components";
import { Colors } from "@/config/constants";

interface ThemedCardProps {
  children?: React.ReactNode;
  message: string;
  iconSource: string;
  iconSize?: number;
  iconColor?: string;
  textSize?: TextType;
}


export const NoDataCard = ({
  children,
  message,
  iconSource,
  iconSize = 120,
  iconColor = Colors.light.primary,
  textSize = "h2",
}: ThemedCardProps) => {
  return (
    <ThemedCard>
      <View className="flex justify-center items-center gap-3">
        <View testID="card-icon">
          <Icon source={iconSource} size={iconSize} color={iconColor} />
        </View>
        <ThemedText
          variant={textSize}
          className="font-ruda !text-slate-700 text-center font-bold"
        >
          {message}
        </ThemedText>
        {children}
      </View>
    </ThemedCard>
  );
};

