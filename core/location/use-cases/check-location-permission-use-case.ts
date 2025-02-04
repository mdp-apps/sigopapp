import * as Location from "expo-location";

import { PermissionStatus } from "../interfaces";

export const checkLocationPermissionUseCase = async (): Promise<PermissionStatus> => {
    const { status } = await Location.getForegroundPermissionsAsync();

    switch (status) {
      case "granted":
        return PermissionStatus.GRANTED;
      case "denied":
        return PermissionStatus.DENIED;
      default:
        return PermissionStatus.UNDETERNAMINED;
    }
  };
