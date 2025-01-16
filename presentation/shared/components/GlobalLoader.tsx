import { ActivityIndicator, View } from "react-native";

export const GlobalLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
