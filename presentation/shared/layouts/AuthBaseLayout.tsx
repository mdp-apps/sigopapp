import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { ThemedView } from "@/presentation/theme/components";
interface AuthBaseLayoutProps {
  children: React.ReactNode;
}

export const AuthBaseLayout = ({ children }: AuthBaseLayoutProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.mainBody}>
        <View style={styles.viewMain}>
          <ImageBackground
            source={require("../../../assets/background_login.png")}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <Text style={styles.text}>Sigop</Text>
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
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  viewMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerScrollView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "150%",
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
