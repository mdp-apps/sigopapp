import React from "react";
import {
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Chip, Icon } from "react-native-paper";

import { ThemedTooltip } from "./ThemedTooltip";

import { Colors } from "@/config/constants";

interface ThemedChipProps {
  mode?: "flat" | "outlined";
  iconSource?: string;
  iconSize?: number;
  iconColor?: string;
  text: string | number;
  tooltipTitle?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ThemedChip = ({
  mode = "flat",
  iconSource,
  iconSize = 24,
  iconColor = "black",
  text,
  tooltipTitle = "",
  style,
  textStyle,
}: ThemedChipProps) => {

  return (
    <ThemedTooltip title={tooltipTitle}>
      <Chip
        mode={mode}
        icon={() =>
          iconSource && (
            <Icon source={iconSource} size={iconSize} color={iconColor} />
          )
        }
        style={[styles.chip, style]}
        textStyle={[styles.text, textStyle]}
      >
        {text}
      </Chip>
    </ThemedTooltip>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 40,
    justifyContent: "center",
    marginBottom: 6,
    backgroundColor: Colors.light.tertiary,
  },
  text: {
    fontSize: 14,
    fontFamily: "Ruda-Bold",
  },
});
