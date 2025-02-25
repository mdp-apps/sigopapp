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
    <HelperText
      variant="titleSmall"
      type={type}
      visible={isVisible}
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      {children}
    </HelperText>
  );
};
