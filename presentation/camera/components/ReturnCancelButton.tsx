import React, { StyleSheet } from "react-native";

import { ThemedButton } from "@/presentation/theme/components";

interface ReturnCancelButtonProps {
  onPress: () => void;
}

//* Botón para regresar a la pantalla anterior.
export const ReturnCancelButton = ({ onPress }: ReturnCancelButtonProps) => {
  
  return (
    <ThemedButton
      className="!p-0"
      variant="icon"
      onPress={onPress}
      iconName="arrow-left"
      iconSize={26}
      iconColor="white"
      style={styles.returnCancelButton}
    />
  );
};

const styles = StyleSheet.create({
  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
