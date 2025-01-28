import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { ThemedText, ThemedView } from "@/presentation/theme/components";
interface AuthBaseLayoutProps {
  children: React.ReactNode;
}

export const AuthBaseLayout = ({ children }: AuthBaseLayoutProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center content-center bg-white">
          <View className="flex-1 justify-center items-center">
            <ImageBackground
              source={require("../../../assets/background_login.png")}
              resizeMode="cover"
              className="flex-1 w-full"
              style={{ height: 500 }}
            >
              {/* <Text style={styles.text}>Sigop</Text> */}
              <ThemedText
                className="text-white font-bold text-5xl uppercase text-center font-ruda-bold mt-20"
              >
                Sigop
              </ThemedText>
            </ImageBackground>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.containerScrollView}
          >
            <ThemedView className="items-center" bgColor="white" margin>
              {children}
            </ThemedView>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerScrollView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: "white",
    fontSize: 48,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",

    marginTop: 68,
    fontFamily: "Ruda-Bold",
  },
});
