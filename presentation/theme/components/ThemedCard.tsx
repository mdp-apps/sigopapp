import React from 'react'
import { StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native'
import { Card } from "react-native-paper";

const { width } = Dimensions.get("window");

interface ThemedCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ThemedCard = ({ children, style }: ThemedCardProps) => {
  return (
    <Card style={[styles.card, style]} mode="contained">
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    width: width - 30,
    marginHorizontal: "auto",
  },
});

