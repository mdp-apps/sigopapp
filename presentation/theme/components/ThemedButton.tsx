import React from "react";
import { Pressable, PressableProps, View } from "react-native";

import { ActivityIndicator, Icon } from "react-native-paper";

import { ThemedText } from "./ThemedText";

import { Colors } from "@/config/constants";

interface Props extends PressableProps {
  children?: React.ReactNode;
  className?: string;
  iconColor?: string;
  iconName?: string;
  iconSize?: number;
  isLoading?: boolean;
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
  isLoading,
  onPress,
  text,
  textClassName,
  variant = "default",
  disabled,
  ...rest
}: Props) => {
  const outlineStyle =
    variant === "outline" ? "border border-white bg-transparent" : "";
  const roundedStyle = variant === "rounded" ? "rounded-full" : "";

  return (
    <Pressable
      testID="button"
      onPress={onPress}
      disabled={disabled}
      className={[
        "active:opacity-80 flex-row justify-center items-center",
        disabled ? "opacity-70" : "",
        variant === "icon" ? "gap-4 p-4" : "px-6 py-3",
        outlineStyle,
        roundedStyle,
        className,
      ].join(" ")}
      {...rest}
    >
      {variant === "icon" && !text ? (
        <Icon
          source={iconName}
          size={iconSize}
          color={iconColor}
        />
      ) : children ? (
        isLoading ? (
          <View className="flex-row justify-center items-center gap-2">
            <ActivityIndicator size="small" color="white" />
            <ThemedText
              className={["text-white text-center", textClassName].join(" ")}
            >
              Cargando...
            </ThemedText>
          </View>
        ) : (
          children
        )
      ) : (
        <>
          {iconName && (
            <Icon source={iconName} size={iconSize} color={iconColor} />
          )}
          <ThemedText
            className={["text-white text-center", textClassName].join(" ")}
          >
            {text}
          </ThemedText>
        </>
      )}
    </Pressable>
  );
};
