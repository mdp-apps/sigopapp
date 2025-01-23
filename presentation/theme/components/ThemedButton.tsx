import { Text, Pressable, PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/config/constants";

interface Props extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  iconColor?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  text?: string;
  textClassName?: string;
  variant?: "outline" | "default" | "rounded" | "icon";
}

export const ThemedButton = ({
  children,
  className,
  iconColor = Colors.light.gray,
  iconName,
  iconSize = 24,
  onPress,
  text,
  textClassName,
  variant = "default",
  ...rest
}: Props) => {
  const outlineStyle =
    variant === "outline" ? "border border-white bg-transparent" : "";
  const roundedStyle = variant === "rounded" ? "rounded-full" : "";

  return (
    <Pressable
      onPress={onPress}
      className={[
        "items-center px-6 py-3 active:opacity-80",
        outlineStyle,
        roundedStyle,
        className,
      ].join(" ")}
      {...rest}
    >
      {variant === "icon" ? (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      ) : children ? (
        children
      ) : (
        <Text className={["text-white text-md", textClassName].join(" ")}>
          {text} {iconName && <Ionicons name={iconName} size={iconSize} />}
        </Text>
      )}
    </Pressable>
  );
};
