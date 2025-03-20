import React from "react";
import { Text, TextProps } from "react-native";

export type TextType =
  | "normal"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "semi-bold"
  | "bold"
  | "link";

interface Props extends TextProps {
  className?: string;
  variant?: TextType;
}

export const ThemedText = ({ className, variant, ...rest }: Props) => {
  return (
    <Text
      className={[
        variant === "normal" ? "font-normal" : undefined,
        variant === "h1" ? "text-4xl" : undefined,
        variant === "h2" ? "text-3xl" : undefined,
        variant === "h3" ? "text-2xl" : undefined,
        variant === "h4" ? "text-xl" : undefined,
        variant === "h5" ? "text-lg" : undefined,
        variant === "h6" ? "text-base" : undefined,
        variant === "semi-bold" ? "font-semibold" : undefined,
        variant === "bold" ? "font-bold" : undefined,
        variant === "link" ? "font-normal underline" : undefined,
        className,
      ].join(" ")}
      {...rest}
    />
  );
};
