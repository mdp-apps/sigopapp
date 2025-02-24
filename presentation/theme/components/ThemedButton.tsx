import { Pressable, PressableProps } from "react-native";

import { Icon } from "react-native-paper";

import { ThemedText } from "./ThemedText";

import { Colors } from "@/config/constants";

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
        "flex-row items-center gap-4 active:opacity-80",
        variant === "icon" ? "p-4" : "px-6 py-3",
        outlineStyle,
        roundedStyle,
        className,
      ].join(" ")}
      {...rest}
    >
      {variant === "icon" && !text ? (
        <Icon source={iconName} size={iconSize} color={iconColor} />
      ) : children ? (
        children
      ) : (
        <>
          {iconName && (
            <Icon source={iconName} size={iconSize} color={iconColor} />
          )}
          <ThemedText className={["text-white text-center", textClassName].join(" ")}>
            {text}
          </ThemedText>
        </>
      )}
    </Pressable>
  );
};
