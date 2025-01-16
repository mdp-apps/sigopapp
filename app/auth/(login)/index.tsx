import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { router } from "expo-router";

import { AuthBaseLayout } from "@/presentation/shared/layouts";

const LoginScreen = () => {
  return (
    <AuthBaseLayout>
      <Text style={{ fontFamily: "Ruda", fontSize: 24, color: "#337AB7" }}>
        Bienvenido/a
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/login-conductor")}
      >
        <Text style={styles.buttonText}>Conductor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/auth/login-sipop")}
      >
        <Text style={styles.buttonText}>Usuario SIGOP</Text>
      </TouchableOpacity>
    </AuthBaseLayout>
  );
};
export default LoginScreen;

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#337AB7",
    paddingVertical: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: screenWidth * 0.9,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Ruda-Bold",
    color: "#fff",
    fontSize: 20,
  },
});
