import React from "react";

import { View } from "react-native";
import { Card } from "react-native-paper";

import { Link } from "expo-router";

import { useReqLocation } from "../hooks";
import {
  ThemedAccordion,
  ThemedButton,
  ThemedChip,
  ThemedText,
} from "@/presentation/theme/components";

import { DriverReq } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";

interface DriverReqCardProps {
  req: DriverReq;
}

export const DriverReqCard = ({ req }: DriverReqCardProps) => {
  const { validateLocation } = useReqLocation(req.internalCode, req.rutDriver);

  return (
    <ThemedAccordion
      title={`REQ ${req.internalCode}`}
      description={`${req.date} [T${req.turn}] - ${req.nameReq}`}
    >
      <Card.Content>
        <View className="flex-row border-b border-gray-200">
          <ThemedChip
            tooltipTitle="Cliente"
            iconSource="account-tie"
            text={req.customerAbbr}
            style={{ backgroundColor: "white" }}
          />

          <ThemedChip
            tooltipTitle="Patente"
            iconSource="car-info"
            text={req.vehiclePatent}
            style={{ backgroundColor: "white" }}
          />

          <ThemedChip
            tooltipTitle="Transportista"
            iconSource="truck-delivery"
            text={req.carrierName}
            style={{ backgroundColor: "white" }}
          />
        </View>

        <View className="mt-5">
          <ThemedChip
            tooltipTitle="Hora ingreso mínima"
            iconSource="clock-check-outline"
            text={`Hora entrada mín. ${DateAdapter.format(
              req.minHour,
              "dd-MM-yyyy HH:mm"
            )}`}
            style={{ backgroundColor: "white" }}
          />

          <ThemedChip
            tooltipTitle="Hora ingreso máxima"
            iconSource="clock-alert-outline"
            text={`Hora entrada máx. ${DateAdapter.format(
              req.maxHour,
              "dd-MM-yyyy HH:mm"
            )}`}
            style={{ backgroundColor: "white" }}
          />
        </View>
      </Card.Content>

      <Card.Actions>
        <View className="flex-1 flex-row gap-4">
          <Link
            className="bg-blue-600 px-4 py-2 rounded-full text-white font-semibold"
            href={{
              pathname: "/ver-detalle-req",
              params: {
                reqCode: req.internalCode,
              },
            }}
          >
            Productos
          </Link>

          <ThemedButton
            className="bg-emerald-600 !px-4 !py-2 rounded-full"
            onPress={() => validateLocation(req)}
          >
            <ThemedText className="text-white font-semibold">
              Generar QR
            </ThemedText>
          </ThemedButton>
        </View>
      </Card.Actions>
    </ThemedAccordion>
  );
};
