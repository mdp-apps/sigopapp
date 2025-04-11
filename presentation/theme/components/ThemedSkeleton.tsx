import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useThemeColor } from "@/presentation/theme/hooks";

type ThemedSkeletonProps = {
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export const ThemedSkeleton = ({
  borderRadius = 4,
  style = {},
}: ThemedSkeletonProps) => {
  const skeletonColor = useThemeColor({}, "lightGray");

  return (
    <View
      style={[
        styles.skeleton,
        { borderRadius, backgroundColor: skeletonColor },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
    height: 20,
  },
});