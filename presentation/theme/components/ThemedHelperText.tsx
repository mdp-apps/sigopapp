import React from "react";
import { HelperText } from "react-native-paper";

interface ThemedHelperText {
  children: React.ReactNode;
  isVisible: boolean;
  type?: "error" | "info";
}

export const ThemedHelperText = ({
  children,
  isVisible,
  type = "error",
}: ThemedHelperText) => {
  return (
    <HelperText variant="titleLarge" type={type} visible={isVisible}>
      {children}
    </HelperText>
  );
};
