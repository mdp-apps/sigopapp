import { View, StyleSheet, Dimensions } from "react-native";
import { Card, Icon } from "react-native-paper";

import { ThemedText } from "@/presentation/theme/components";
import { Colors } from "@/config/constants";

interface ThemedCardProps {
  message: string;
  iconSource: string;
  iconSize?: number;
  iconColor?: string;
}

const { width } = Dimensions.get("window");

export const NoDataCard = ({
  message,
  iconSource,
  iconSize = 120,
  iconColor = Colors.light.primary,
}: ThemedCardProps) => {
  return (
    <Card style={styles.card}>
      <View className="flex justify-center items-center gap-3">
        <View>
          <Icon source={iconSource} size={iconSize} color={iconColor} />
        </View>
        <ThemedText
          variant="h2"
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
  },
});
