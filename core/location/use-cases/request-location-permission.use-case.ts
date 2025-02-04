import { Alert, Linking } from "react-native";
import * as Location from "expo-location";

import { PermissionStatus } from "../interfaces";

export const requestLocationPermissionUseCase = async (): Promise<PermissionStatus> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    status === "denied" && manualPermissionRequest();

    return PermissionStatus.DENIED;
  }

  return PermissionStatus.GRANTED;
};

const manualPermissionRequest = (): void => {
  Alert.alert(
    "Permisos de ubicación necesario",
    "Para continuar debe de habilitar los permisos de ubicación en los ajustes de la app",
    [
      {
        text: "Abrir ajustes",
        onPress: () => Linking.openSettings(),
      },
      {
        text: "Cancelar",
        style: "destructive",
      },
    ]
  );
};
