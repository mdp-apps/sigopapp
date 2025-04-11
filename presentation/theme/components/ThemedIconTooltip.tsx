import React from "react";

import { ThemedTooltip } from "./ThemedTooltip";
import { ThemedButton } from "./ThemedButton";

type IconStyles = {
  name: string;
  color?: string;
  size?: number;
};

interface ThemedIconTooltipProps {
  tooltipTitle: string;
  position?: "default" | "top" | "right" | "bottom" | "left";
  iconStyles: IconStyles;
}

export const ThemedIconTooltip = ({
  iconStyles,
  tooltipTitle,
  position = "default",
}: ThemedIconTooltipProps) => {

  return (
    <ThemedTooltip title={tooltipTitle} position={position}>
      <ThemedButton
        className="!p-0"
        variant="icon"
        iconName={iconStyles.name}
        iconSize={iconStyles.size}
        iconColor={iconStyles.color}
      />
    </ThemedTooltip>
  );
};
