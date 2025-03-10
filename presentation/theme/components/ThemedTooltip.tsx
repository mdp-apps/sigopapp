import { useVisibility } from "@/presentation/shared/hooks";
import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

type ReactElement = React.ReactElement<any>;

interface ThemedTooltipProps {
  children: React.ReactNode;
  title: string;
  openOnLongPress?: boolean;
}

export const ThemedTooltip = ({
  children,
  title,
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

      // Escoge el handler según openOnLongPress
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

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View>
        {clonedChildren}
        {isTooltipVisible && (
          <View className="absolute top-0.5 right-0 bg-slate-800 p-2 rounded-xl z-50 min-w-24 self-center">
            <Text className="text-white text-center">{title}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
