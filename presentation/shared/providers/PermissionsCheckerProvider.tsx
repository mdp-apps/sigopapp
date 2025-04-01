import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { router } from "expo-router";

import { useLocationPermissionsStore } from "../store";
import { PermissionStatus } from "@/core/location/interfaces";

export const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } =
    useLocationPermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/(sigop-app)/(home)");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // console.log({nextAppState});

      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return children;
};
