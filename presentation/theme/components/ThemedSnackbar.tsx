import React from "react";
import { Snackbar } from "react-native-paper";

import { useThemeColor } from "../hooks";

interface ThemedSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  duration?: number;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const ThemedSnackbar = ({
  visible,
  onDismiss,
  duration,
  message,
  actionLabel = "Aceptar",
  onActionPress,
}: ThemedSnackbarProps) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={{
        label: actionLabel,
        onPress: onActionPress || (() => {}),
      }}
      style={{
        backgroundColor: primaryColor,
      }}
    >
      {message}
    </Snackbar>
  );
};
