import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { ThemedView } from "./ThemedView";

interface ThemedLoaderProps {
  color: string;
  size?: "small" | "large";
}

export const ThemedLoader = ({color,size}: ThemedLoaderProps) => {
  return (
    <ThemedView className="items-center justify-center" safe>
      <ActivityIndicator
        color={color}
        size={size}
        className="mx-auto"
      />
    </ThemedView>
  );
};
