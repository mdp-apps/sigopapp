import { StyleSheet, TextStyle, StyleProp, ViewStyle } from "react-native";
import { Chip, Icon, Tooltip } from "react-native-paper";

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
    <Tooltip title={tooltipTitle ?? ""}>
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
    </Tooltip>
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
