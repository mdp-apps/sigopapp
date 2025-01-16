import { View } from "react-native";

import { Card } from "react-native-paper";

import { Link } from "expo-router";

import { useReqStore } from "../store";
import { ThemedButton, ThemedChip } from "@/presentation/theme/components";

import { DriverReq } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";

interface DriverReqCardProps {
  req: DriverReq;
}

export const DriverReqCard = ({ req }: DriverReqCardProps) => {
  const { showObservationModal } = useReqStore();

  return (
    <Card>
      <Card.Title
        title={`Req. ${req.internalCode}`}
        titleStyle={{ fontSize: 22, fontFamily: "Ruda-Bold" }}
        subtitle={`${req.date} [T${req.turn}] - ${req.nameReq}`}
        subtitleStyle={{ fontSize: 17, fontFamily: "Ruda-Bold" }}
      />

      <Card.Content>
        <View className="flex flex-row flex-wrap">
          <ThemedChip
            tooltipTitle="Cliente"
            iconSource="account-tie"
            text={req.customerAbbr}
          />

          <ThemedChip
            tooltipTitle="Patente"
            iconSource="car-info"
            text={req.vehiclePatent}
            style={{ marginLeft: 10 }}
          />
        </View>

        <ThemedChip
          tooltipTitle="Transportista"
          iconSource="truck-delivery"
          text={req.carrierName}
        />

        <ThemedChip
          tooltipTitle="Hora ingreso mínima"
          iconSource="clock-check-outline"
          text={`Hora entrada mín. ${DateAdapter.format(
            req.minHour,
            "dd-MM-yyyy HH:mm"
          )}`}
        />

        <ThemedChip
          tooltipTitle="Hora ingreso máxima"
          iconSource="clock-alert-outline"
          text={`Hora entrada máx. ${DateAdapter.format(
            req.maxHour,
            "dd-MM-yyyy HH:mm"
          )}`}
        />
      </Card.Content>

      <Card.Actions>
        {req.observation && (
          <ThemedButton
            text="Observación"
            className="bg-blue-800 text-white px-4 py-2 rounded-full"
            onPress={() => showObservationModal(req.observation)}
          />
        )}

        <Link
          className="bg-blue-800 px-4 py-2 rounded-full text-white"
          href={{
            pathname: "/detalle-req",
            params: {
              vehiclePatent: req.vehiclePatent,
              customerAbbr: req.customerAbbr,
              carrierName: req.carrierName,
              reqType: `${req.reqType}${req.formatType}`,
              reqCode: req.internalCode,
            },
          }}
        >
          Productos
        </Link>

        <Link
          className="bg-blue-800 px-4 py-2 rounded-full text-white"
          href={{
            pathname: "/detalle-conductor",
            params: {
              reqCode: req.internalCode,
              status: req.status,
              vehiclePatent: req.vehiclePatent,
              driverRut: req.rutDriver,
              reqType: `${req.reqType}${req.formatType}`,
            },
          }}
        >
          Siguiente
        </Link>
      </Card.Actions>
    </Card>
  );
};
