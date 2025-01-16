import React, { useState, useRef } from "react";

import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { router } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";
import { StorageAdapter } from "@/config/adapters/storage.adapter";

import { Ionicons } from "@expo/vector-icons";
import { AuthBaseLayout } from "@/presentation/shared/layouts";

const LoginSigopScreen = () => {
  const passwordInputRef = useRef<TextInput>(null);

  const { login } = useAuthStore();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmitPress = async () => {
    if (!userEmail) {
      Alert.alert("Error", "Ingrese su correo");
      return;
    }

    if (!userPassword) {
      Alert.alert("Error", "Ingrese su contraseña");
      return;
    }

    const authSession = await login(userEmail, userPassword);

    if (authSession) {
      router.push("/(sigop-app)/(home)");
    } else {
      Alert.alert("Error", "Valide su email o su contraseña.");
    }
  };

  return (
    <AuthBaseLayout>
      <Text style={{ fontFamily: "Ruda", fontSize: 24, color: "#337AB7" }}>
        Iniciar sesión
      </Text>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(userEmail) => setUserEmail(userEmail)}
          placeholder="Ingrese su correo electrónico"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            return passwordInputRef.current && passwordInputRef.current.focus();
          }}
          value={userEmail}
        />
      </View>

      <View style={styles.sectionStyle}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPasswordStyle}
            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            placeholder="Ingrese su contraseña" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry={!isPasswordVisible}
            returnKeyType="next"
            value={userPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#8b9cb5"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleSubmitPress}
      >
        <Text style={styles.buttonTextStyle}>INGRESAR</Text>
      </TouchableOpacity>
      <Text
        onPress={async () => {
          router.push("/auth/login-conductor");

          await StorageAdapter.clear();
        }}
        style={{
          fontFamily: "Ruda",
          fontSize: 24,
          color: "#337AB7",
          textDecorationLine: "underline",
        }}
      >
        Soy conductor/a
      </Text>
    </AuthBaseLayout>
  );
};
export default LoginSigopScreen;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#1687a7",
    borderWidth: 0,
    height: 50,
    alignItems: "center",
    width: screenWidth * 0.825,
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 8,
    fontSize: 20,
    fontFamily: "Ruda",
  },
  iconContainer: {
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#1687a7",
    backgroundColor: "#fff",
    height: 50,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    fontFamily: "Ruda",
    backgroundColor: "#fff",
    borderColor: "#1687a7",
  },
  inputPasswordStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "Ruda",
  },
});
