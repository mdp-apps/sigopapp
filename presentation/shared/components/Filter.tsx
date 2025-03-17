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
  const primaryColor = useThemeColor({}, "primary");
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <ThemedButton
      className="bg-light-white  border-r border-slate-300"
      onPress={onPress}
    >
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
  );
};
