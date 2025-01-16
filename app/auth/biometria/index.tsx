import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

import { Ionicons } from "@expo/vector-icons";

const BiometriaScreen = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);


  useEffect(() => {
    checkBiometricEnabled();
    authenticateBiometricsOnLoad();
  }, []);

  const checkBiometricEnabled = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricEnabled(hasHardware && isEnrolled);
  };


  const authenticateBiometricsOnLoad = async () => {
    if (Platform.OS === "ios") {
      navigateToNextScreen(); // Para iOS, salta directamente a la siguiente pantalla
      return;
    }
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Por favor, autentique su huella digital", // Mensaje que se muestra al usuario
      });
      if (result.success) {
        router.push("/(sigop-app)/(home)");
      }
    } catch (error) {
      console.error("Error al autenticar la huella digital:", error);
    }
  };

  const navigateToNextScreen = () => {
    router.push("/(sigop-app)/(home)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      {/* Icono de huella digital para activar la autenticación biométrica */}
      {biometricEnabled && (
        <TouchableOpacity onPress={authenticateBiometricsOnLoad}>
          <Ionicons name="finger-print-outline" size={100} color="blue" />
        </TouchableOpacity>
      )}
      {/* Otro contenido de la pantalla de inicio de sesión aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default BiometriaScreen;
