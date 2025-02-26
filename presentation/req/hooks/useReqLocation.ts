import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { router } from "expo-router";

import { useLocationStore } from "@/presentation/shared/store";
import {
  useChangeReqStatusMutation,
  useValidateActiveReqsMutation,
} from "@/presentation/req/hooks";

import { DriverReq } from "@/infrastructure/entities";
import { CalcAdapter } from "@/config/adapters";
import { TARGET_LATITUDE, TARGET_LONGITUDE } from "@/config/constants";

export const useReqLocation = (reqCode: number, driverRut: string) => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { lastKnownLocation, getLocation } = useLocationStore();
  const { currentStatus } = useChangeReqStatusMutation();
  const { validateActiveReqs } = useValidateActiveReqsMutation(reqCode);
  

  useEffect(() => {
    if (!lastKnownLocation) getLocation();
  }, []);

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

    if (isInZone) {
      Alert.alert("Confirmar", "¿Está seguro de confirmar su llegada?", [
        {
          text: "Confirmar",
          onPress: async () => {
            validateActiveReqs.mutate({
              requerimiento: String(reqCode),
              rut: driverRut,
            });

            const isConfirm =
              validateActiveReqs.data &&
              validateActiveReqs.data[0].loadNumber === 0;
            
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
    lastUpdated,
    currentStatus,

    getLocation,
    validateLocation,
    setLastUpdated,
  };
};
