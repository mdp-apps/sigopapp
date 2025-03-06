import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import { useVisibility } from "@/presentation/shared/hooks";
import { ThemedTooltip } from "./ThemedTooltip";
import { ThemedButton } from "./ThemedButton";

type IconStyles = {
  name: string;
  color?: string;
  size?: number;
};

interface ThemedIconTooltipProps {
  tooltipTitle: string;
  iconStyles: IconStyles;
}

export const ThemedIconTooltip = ({
  iconStyles,
  tooltipTitle,
}: ThemedIconTooltipProps) => {
  const {
    isVisible: isTooltipVisible,
    hide: handleOutsidePress,
    toggle: handleChipPress,
  } = useVisibility();

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View>
        <ThemedButton
          className="!p-0"
          variant="icon"
          onPress={() => handleChipPress()}
          iconName={iconStyles.name}
          iconSize={iconStyles.size}
          iconColor={iconStyles.color}
        />

        {isTooltipVisible && <ThemedTooltip title={tooltipTitle} />}
      </View>
    </TouchableWithoutFeedback>
  );
};
