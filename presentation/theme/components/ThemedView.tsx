import { View, ViewProps } from "react-native";

import { useThemeColor } from "../hooks";

import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  className?: string;
  margin?: boolean;
  safe?: boolean;
  bgColor?: string;
}

export const ThemedView = ({
  style,
  className,
  margin = false,
  safe = false,
  bgColor,
  children,
}: Props) => {
  const backgroundColor = useThemeColor({}, "background");
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: safe ? safeArea.top : 0,
          marginHorizontal: margin ? 15 : 0,
          backgroundColor: bgColor ? bgColor : backgroundColor,
        },
        style,
      ]}
      className={className}
    >
      {children}
    </View>
  );
};
