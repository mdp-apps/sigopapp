import React from "react";
import { StyleSheet } from "react-native";

import { ThemedButton } from '@/presentation/theme/components';

interface GalleryButtonProps {
  onPress: () => void;
}

//* Botón para abrir la galería de imágenes.
export const GalleryButton = ({ onPress }: GalleryButtonProps) => {

  return (
    <ThemedButton
      className="!p-0"
      variant="icon"
      onPress={onPress}
      iconName="image-multiple"
      iconSize={26}
      iconColor="white"
      style={styles.galleryButton}
    />
  );
};

const styles = StyleSheet.create({
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
