import React from "react";
import {
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { Chip, Icon } from "react-native-paper";

import { useVisibility } from "@/presentation/shared/hooks";

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
  const {
    isVisible: isTooltipVisible,
    hide: handleOutsidePress,
    toggle: handleChipPress,
  } = useVisibility();

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View>
        <Chip
          mode={mode}
          icon={() =>
            iconSource && (
              <Icon source={iconSource} size={iconSize} color={iconColor} />
            )
          }
          style={[styles.chip, style]}
          textStyle={[styles.text, textStyle]}
          onPress={() => handleChipPress()}
        >
          {text}
        </Chip>

        {isTooltipVisible && (
          <View className="absolute top-0.5 right-0 bg-slate-800 p-2 rounded-xl z-50">
            <Text className="text-white text-center">{tooltipTitle}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
