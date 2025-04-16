import React from 'react'
import { StyleSheet, useWindowDimensions } from "react-native";

import { useThemeColor } from '@/presentation/theme/hooks';
import { ThemedButton } from '@/presentation/theme/components';

interface ShutterButtonProps { 
  onPress: () => void;
}

//* Botón para tomar una foto.
export const ShutterButton = ({ onPress }: ShutterButtonProps) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");
  return (
    <ThemedButton
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  shutterButton: {
    position: "absolute",
    bottom: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
