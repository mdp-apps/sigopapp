import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { router } from "expo-router";

import { AuthBaseLayout } from "@/presentation/shared/layouts";
import { useAuthStore } from "@/presentation/auth/store";

import { StorageAdapter } from "@/config/adapters";
import { Formatter } from "@/config/helpers";
import { REGEX } from "@/config/constants";

const LoginConductorScreen = () => {
  const [rut, setRut] = useState("");
  const [isValidRut, setIsValidRut] = useState(true);

  const { loginDriver } = useAuthStore();

  const validateRut = (rut: string) => {
    const formattedRut = Formatter.formatRut(rut);

    if (REGEX.rut.test(formattedRut)) {
      setIsValidRut(true);
      setRut(formattedRut);
    } else {
      setIsValidRut(false);
      setRut("");
      Alert.alert("Error", "El RUT ingresado es incorrecto.");
    }
  };

  const handleSubmitPress = async () => {
    const formattedRut = Formatter.formatRut(rut);
    validateRut(formattedRut);

    if (!formattedRut) {
      Alert.alert("Error", "Ingrese su RUT");
      return;
    }

    const driverSession = await loginDriver(formattedRut);
    console.log(JSON.stringify(driverSession, null, 2));

    if (driverSession) {
      router.push("/(sigop-app)/(home)");
    } else {
      Alert.alert("Error", "RUT no está registrado.");
    }
  };

  return (
    <AuthBaseLayout>
      <Text style={{ fontFamily: "Ruda", fontSize: 24, color: "#337AB7" }}>
        Iniciar sesión
      </Text>
      <View style={styles.sectionStyle}>
        <TextInput
          style={[styles.inputStyle, !isValidRut && styles.invalidInput]}
          onChangeText={(input) => setRut(input)}
          value={rut}
          // onBlur={() => validateRut(rut)}
          placeholder="Ingrese su RUT  (Sin puntos, con guión y DV)"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="name-phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => validateRut(rut)}
        />
      </View>

      <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmitPress}>
        <Text style={styles.buttonTextStyle}>INGRESAR</Text>
      </TouchableOpacity>
      <Text
        onPress={async () => {
          router.push("/auth/login-sipop");
          await StorageAdapter.clear();
        }}
        style={{
          fontFamily: "Ruda",
          fontSize: 24,
          color: "#337AB7",
          textDecorationLine: "underline",
        }}
      >
        Soy usuario/a de Sigop
      </Text>
    </AuthBaseLayout>
  );
};
export default LoginConductorScreen;

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 8,
    fontSize: 20,
    fontFamily: "Ruda",
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
    fontSize: 13,
    backgroundColor: "#fff",
    borderColor: "#1687a7",
    textDecorationLine: "none",
  },
  invalidInput: {
    borderColor: "red", // color del borde cuando el RUT no es válido
  },
});
