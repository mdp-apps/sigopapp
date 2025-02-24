import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { router } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";
import { useLocationStore } from "@/presentation/shared/store";
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentStatus, setCurrentStatus] = useState<number | null>(null);

  const { user } = useAuthStore();
  const { lastKnownLocation, getLocation } = useLocationStore();

  const { reqStatus } = useReqStatusByCode(String(reqCode));
  const { changeReqStatus, isLoadingChangeReqStatus } = useChangeReqStatus();
  const { validateActiveReqs } = useValidateActiveReqs();

  useEffect(() => {
    if (!lastKnownLocation) getLocation();

  }, []);

  useEffect(() => {
    setCurrentStatus(reqStatus.status);
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
      Alert.alert("Alerta", "No se ha confirmado la llegada.");
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
        Alert.alert("Alerta", "Hay otro requerimiento en curso.");

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

  const validateLocation = async (req: DriverReq) => {
    
    const distance =
      lastKnownLocation &&
      CalcAdapter.calculateDistance(
        lastKnownLocation.latitude,
        lastKnownLocation.longitude,
        TARGET_LATITUDE,
        TARGET_LONGITUDE
      );

    const radius = 1500;
    const isInZone = distance && distance <= radius;
    console.log(
      JSON.stringify(
        {
          reqCode: req.internalCode,
          distance,
          isInZone,
          latitude: lastKnownLocation?.latitude,
          longitude: lastKnownLocation?.longitude,
        },
        null,
        2
      )
    );

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
        "Alerta",
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
    lastKnownLocation,
    isLoadingChangeReqStatus,
    lastUpdated,
    currentStatus,

    getLocation,
    validateLocation,
    setLastUpdated,
  };
};
