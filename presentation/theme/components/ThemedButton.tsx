import { Text, Pressable, PressableProps } from "react-native";

import { Colors } from "@/config/constants";
import { Icon } from "react-native-paper";

interface Props extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  iconColor?: string;
  iconName?: string;
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
        "items-center active:opacity-80",
        variant === "icon" ? "p-4" : "px-6 py-3",
        outlineStyle,
        roundedStyle,
        className,
      ].join(" ")}
      {...rest}
    >
      {variant === "icon" ? (
        <Icon source={iconName} size={iconSize} color={iconColor} />
      ) : children ? (
        children
      ) : (
        <Text className={["text-white text-md", textClassName].join(" ")}>
          {text} {iconName && <Icon source={iconName} size={iconSize} />}
        </Text>
      )}
    </Pressable>
  );
};
