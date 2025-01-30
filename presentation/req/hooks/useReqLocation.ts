import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";

import { useAuthStore } from "@/presentation/auth/store";
import {
  useChangeReqStatus,
  useReqStatusByCode,
  useValidateActiveReqs,
} from "@/presentation/req/hooks";

import { DriverReq } from "@/infrastructure/entities";
import { CalcAdapter } from "@/config/adapters";
import {
  REQ_STATUS,
  TARGET_LATITUDE,
  TARGET_LONGITUDE,
} from "@/config/constants";

export const useReqLocation = (reqCode: number, driverRut: string) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorLocation, setErrorLocation] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);

  const { user } = useAuthStore();
  const { reqStatus } = useReqStatusByCode(String(reqCode));
  const { changeReqStatus, isLoadingChangeReqStatus } = useChangeReqStatus();
  const { validateActiveReqs } = useValidateActiveReqs();

  useEffect(() => {
    (async () => {
      setCurrentStatus(reqStatus.status);
      if (reqStatus.status !== REQ_STATUS.pendiente) {
        await getLocation();
      }
    })();
  }, [reqStatus]);

  const validateRequirement = async () => {
    try {
      const activeReqs = await validateActiveReqs(
        String(reqCode),
        driverRut as string
      );

      if (activeReqs) {
        return activeReqs[0].loadNumber;
      } else {
        throw new Error("No se ha confirmado la llegada.");
      }
    } catch (error) {
      throw error;
    }
  };

  const changeRequirementStatus = async (reqCode: string, status: number) => {
    const response = await changeReqStatus(reqCode, status, user?.code!);

    if (response.result !== "") {
      setCurrentStatus(status);
    } else {
      Alert.alert("Error", "No se ha confirmado la llegada.");
    }
  };

  const handleConfirm = async () => {
    try {
      const resultado = await validateRequirement();
      if (resultado === 0) {
        await changeRequirementStatus(String(reqCode), REQ_STATUS.pendiente);
        setCurrentStatus(REQ_STATUS.pendiente);

        return true;
      } else {
        Alert.alert("Error", "Hay otro requerimiento en curso.");

        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", String(error));
      }
    }
  };

  const getLocation = async () => {
    try {
      console.log("Getting location...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorLocation("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(JSON.stringify(location, null, 2));

      setLocation(location);
      setLastUpdated(new Date());
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorLocation(error.message);
      } else {
        setErrorLocation(String(error));
      }
    }
  };

  const validateLocation = (req: DriverReq) => {
    const distance = location
      ? CalcAdapter.calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          TARGET_LATITUDE,
          TARGET_LONGITUDE
        )
      : null;

    const radius = 1500;
    const isInZone = distance !== null && distance <= radius;

    if (isInZone) {
      Alert.alert("Confirmar", "¿Está seguro de confirmar su llegada?", [
        {
          text: "Confirmar",
          onPress: async () => {
            const isConfirm = await handleConfirm();
            if (isConfirm) {
              router.push({
                pathname: "/ingreso-conductor",
                params: {
                  reqCode: req.internalCode,
                  status: req.status,
                  vehiclePatent: req.vehiclePatent,
                  driverRut: req.rutDriver,
                  reqType: `${req.reqType}${req.formatType}`,
                },
              });
            }
          },
          style: "default",
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert(
        "Error",
        "No está dentro del rango permitido para confirmar su llegada.",
        [
          {
            text: "Aceptar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };

  return {
    location,
    errorLocation,
    isLoadingChangeReqStatus,
    lastUpdated,
    currentStatus,

    getLocation,
    validateLocation,
    setLastUpdated,
  };
};
