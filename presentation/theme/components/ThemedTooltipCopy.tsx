import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

import { useVisibility } from "@/presentation/shared/hooks";

type ReactElement = React.ReactElement<any>;

interface ThemedTooltipProps {
  children: React.ReactNode;
  title: string;
  position?: "default" | "top" | "right" | "bottom" | "left";
  openOnLongPress?: boolean;
}

export const ThemedTooltip = ({
  children,
  title,
  position = "default",
  openOnLongPress = false,
}: ThemedTooltipProps) => {
  const {
    isVisible: isTooltipVisible,
    hide: handleOutsidePress,
    toggle: handleChipPress,
  } = useVisibility();

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const originalOnPress = (child as ReactElement).props.onPress;
      const originalOnLongPress = (child as ReactElement).props.onLongPress;

      if (openOnLongPress) {
        return React.cloneElement(child as ReactElement, {
          onLongPress: (e: any) => {
            originalOnLongPress?.(e);
            handleChipPress();
          },
        });
      } else {
        return React.cloneElement(child as ReactElement, {
          onPress: (e: any) => {
            originalOnPress?.(e);
            handleChipPress();
          },
        });
      }
    }
    return child;
  });

  const tooltipPositionStyle = {
    default: {},
    top: styles.tooltipTop,
    right: styles.tooltipRight,
    bottom: styles.tooltipBottom,
    left: styles.tooltipLeft,
  }[position];

  return (
    <TouchableWithoutFeedback
      onPress={handleOutsidePress}
      style={{ position: "relative", zIndex: 99 }}
    >
      <View style={styles.container}>
        {clonedChildren}
        {isTooltipVisible && (
          <View style={[styles.tooltip, tooltipPositionStyle]}>
            <Text className="text-white text-center">{title}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 99,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#1e293b",
    padding: 6,
    borderRadius: 10,
    zIndex: 99,
    elevation: 10,
    minWidth: 120,
    maxWidth: 200,
    alignSelf: "center",
  },
  tooltipTop: {
    bottom: "100%",
    left: "0%",
    transform: [{ translateX: "-0%" }],
    marginBottom: 8,
  },
  tooltipBottom: {
    top: "100%",
    left: "25%",
    transform: [{ translateX: "-50%" }],
    marginTop: 8,
  },
  tooltipLeft: {
    right: "100%",
    top: "50%",
    transform: [{ translateY: "-50%" }],
    marginRight: 8,
  },
  tooltipRight: {
    left: "50%",
    top: "50%",
    transform: [{ translateY: "-50%" }],
    marginLeft: 8,
  },
});
