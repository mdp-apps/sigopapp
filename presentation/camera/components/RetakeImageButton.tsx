import React,{ StyleSheet } from "react-native";

import { ThemedButton } from '@/presentation/theme/components';

interface RetakeImageButtonProps {
  onPress: () => void;
}

//* Botón para volver a tomar una foto.
export const RetakeImageButton = ({ onPress }: RetakeImageButtonProps) => {
  return (
    <ThemedButton
      className="!p-0"
      variant="icon"
      onPress={onPress}
      iconName="close"
      iconSize={26}
      iconColor="white"
      style={styles.retakeImageButton}
    />
  );
};

const styles = StyleSheet.create({
  retakeImageButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});