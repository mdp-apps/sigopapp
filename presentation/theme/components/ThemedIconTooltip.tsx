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
  iconStyles: IconStyles;
}

export const ThemedIconTooltip = ({
  iconStyles,
  tooltipTitle,
}: ThemedIconTooltipProps) => {

  return (
    <ThemedTooltip title={tooltipTitle}>
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
