import React from "react";

import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Icon } from "react-native-paper";

import { TextType, ThemedText } from "@/presentation/theme/components";
import { Colors } from "@/config/constants";

interface ThemedCardProps {
  message: string;
  iconSource: string;
  iconSize?: number;
  iconColor?: string;
  textSize?: TextType;
}

const { width } = Dimensions.get("window");

export const NoDataCard = ({
  message,
  iconSource,
  iconSize = 120,
  iconColor = Colors.light.primary,
  textSize = "h2",
}: ThemedCardProps) => {
  return (
    <Card style={styles.card}>
      <View className="flex justify-center items-center gap-3">
        <View testID="card-icon">
          <Icon source={iconSource} size={iconSize} color={iconColor} />
        </View>
        <ThemedText
          variant={textSize}
          className="font-ruda !text-slate-700 text-center font-bold"
        >
          {message}
        </ThemedText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    width: width - 30,
    marginHorizontal: "auto",
  },
});
