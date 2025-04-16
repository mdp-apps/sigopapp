import React from 'react'
import { StyleSheet, useWindowDimensions } from "react-native";

import { useThemeColor } from '@/presentation/theme/hooks';
import { ThemedButton } from '@/presentation/theme/components';

interface ConfirmImageButtonProps {
  onPress: () => void;
}

//* Botón para confirmar la imagen tomada.
export const ConfirmImageButton = ({ onPress }: ConfirmImageButtonProps) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <ThemedButton
      className="!p-0"
      variant="icon"
      onPress={onPress}
      iconName="check"
      iconSize={30}
      iconColor={primaryColor}
      style={[
        styles.confirmImageButton,
        {
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    />
  );
};


const styles = StyleSheet.create({
  confirmImageButton: {
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