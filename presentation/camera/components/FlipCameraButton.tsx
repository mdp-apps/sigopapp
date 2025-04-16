import React,{ StyleSheet } from "react-native";

import { ThemedButton } from '@/presentation/theme/components';

interface FlipCameraButtonProps {
  onPress: () => void;
}

//* Botón para cambiar el tipo de cámara ya sea frontal o trasera.
export const FlipCameraButton = ({ onPress }: FlipCameraButtonProps) => {
  return (
    <ThemedButton
      className="!p-0"
      variant="icon"
      onPress={onPress}
      iconName="camera-flip"
      iconSize={26}
      iconColor="white"
      style={styles.flipCameraButton}
    />
  );
};

const styles = StyleSheet.create({
  flipCameraButton: {
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