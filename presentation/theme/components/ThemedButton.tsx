import React from "react";
import { Text, Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  textClassName?: string;
  variant?: "outline" | "default" | "rounded";
}

export const ThemedButton = ({
  children,
  className,
  onPress,
  text,
  textClassName,
  variant = "default",
  ...rest
}: Props) => {
  const outlineStyle = variant === "outline" ? "border border-white bg-transparent" : "";
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
      {children ? (
        children
      ) : (
        <Text className={["text-white text-md", textClassName].join(" ")}>{text}</Text>
      )}
    </Pressable>
  );
};
