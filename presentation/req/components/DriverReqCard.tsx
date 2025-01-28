import { useState } from "react";
import { View,StyleSheet } from "react-native";

import { Card, List } from "react-native-paper";

import { Link } from "expo-router";

import { ThemedChip } from "@/presentation/theme/components";

import { DriverReq } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";

interface DriverReqCardProps {
  req: DriverReq;
}

export const DriverReqCard = ({ req }: DriverReqCardProps) => {
  const [expanded, setExpanded] = useState(false);
  console.log(JSON.stringify(req, null, 2));

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      title={`REQ ${req.internalCode}`}
      description={`${req.date} [T${req.turn}] - ${req.nameReq}`}
      expanded={expanded}
      onPress={handlePress}
      titleStyle={styles.titleStyle}
      descriptionStyle={styles.descriptionStyle}
      style={[styles.accordionStyle, { backgroundColor: "#f3f3f3" }]}
    >
      <Card style={styles.cardStyle}>
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
              className="bg-emerald-600 px-4 py-2 rounded-full text-white font-semibold"
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
              Generar QR
            </Link>
          </View>
        </Card.Actions>
      </Card>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  accordionStyle: {
    position: "fixed",
    top: 0,
    backgroundColor: "white",
    width: 390,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  titleStyle: {
    fontSize: 22,
    fontFamily: "Ruda-Bold",
    color: "black",
  },
  descriptionStyle: {
    fontSize: 14,
    fontFamily: "Ruda-Bold",
  },
  cardStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    width: "100%",
    borderRadius: "none",
    backgroundColor: "white",
  },
});
