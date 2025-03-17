import React from "react";
import { View } from "react-native";

import { useThemeColor } from "@/presentation/theme/hooks";
import { ThemedButton, ThemedText } from "@/presentation/theme/components";

interface ReqFilterProps {
  onPress: () => void;
  onClear: () => void;
  filterKey: string;
  displayValue: string;
  filterLabels: Record<string, string>;
}

export const Filter = ({
  onPress,
  onClear,
  filterKey,
  displayValue,
  filterLabels,
}: ReqFilterProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <View className="flex-row items-center bg-light-white border-r border-t border-b border-slate-300">
      <ThemedButton onPress={onPress}>
        <ThemedText
          variant="h6"
          className={`text-slate-900 uppercase text-center ${
            displayValue ? "font-bold" : "font-semibold"
          }`}
          style={{
            color: displayValue ? primaryColor : darkGrayColor,
          }}
        >
          {displayValue
            ? `${filterLabels[filterKey]}: ${displayValue}`
            : filterLabels[filterKey]}
        </ThemedText>
      </ThemedButton>

      {displayValue && (
        <ThemedButton
          onPress={onClear}
          className="!p-0 mr-2"
          variant="icon"
          iconName="close-circle"
          iconColor={primaryColor}
        />
      )}
    </View>
  );
};
