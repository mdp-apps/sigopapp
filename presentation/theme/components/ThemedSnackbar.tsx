import { Snackbar } from "react-native-paper";

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
  duration = 3000,
  message,
  actionLabel = "Aceptar",
  onActionPress,
}: ThemedSnackbarProps) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={{
        label: actionLabel,
        onPress: onActionPress || (() => {}),
      }}
    >
      {message}
    </Snackbar>
  );
};
