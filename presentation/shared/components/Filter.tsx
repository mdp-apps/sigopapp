import React from "react";

import { ThemedButton, ThemedText } from "@/presentation/theme/components";
import { useThemeColor } from "@/presentation/theme/hooks";

interface ReqFilterProps {
  onPress: () => void;
  filterKey: string;
  displayValue: string;
  filterLabels: Record<string, string>;
}

export const Filter = ({
  onPress,
  filterKey,
  displayValue,
  filterLabels,
}: ReqFilterProps) => {
  const blueColor = useThemeColor({}, "blue");
  const lightWhiteColor = useThemeColor({}, "lightWhite");

  return (
    <ThemedButton
      className="px-4 py-2 rounded-3xl border-blue-800 border-2 bg-light-white mr-2"
      onPress={onPress}
      style={{
        backgroundColor: displayValue ? blueColor : lightWhiteColor,
      }}
    >
      <ThemedText
        variant="h6"
        className="font-ruda text-slate-900"
        style={{
          color: displayValue ? lightWhiteColor : blueColor,
        }}
      >
        {displayValue
          ? `${filterLabels[filterKey]}: ${displayValue}`
          : filterLabels[filterKey]}
      </ThemedText>
    </ThemedButton>
  );
};
