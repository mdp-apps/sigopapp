import { View } from "react-native";

import { Card, List } from "react-native-paper";

import { Link } from "expo-router";

import { ThemedChip } from "@/presentation/theme/components";

import { DriverReq } from "@/infrastructure/entities";
import { DateAdapter } from "@/config/adapters";
import { useState } from "react";
import { StyleSheet } from "react-native";

interface DriverReqCardProps {
  req: DriverReq;
}

export const DriverReqCard = ({ req }: DriverReqCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
      <List.Accordion
        title={`REQ ${req.internalCode}`}
        description={`${req.date} [T${req.turn}] - ${req.nameReq}`}
        expanded={expanded}
        onPress={handlePress}
        titleStyle={styles.titleStyle}
        descriptionStyle={styles.descriptionStyle}
        style={styles.accordionStyle}
      >
        <Card style={styles.cardStyle}>
          <Card.Content>
            <View className="flex-row">
              <ThemedChip
                tooltipTitle="Cliente"
                iconSource="account-tie"
                text={req.customerAbbr}
              />

              <ThemedChip
                tooltipTitle="Patente"
                iconSource="car-info"
                text={req.vehiclePatent}
                style={styles.chipMargin}
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
            <View className="flex-1 flex-row gap-4">
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
                className="bg-green-600 px-4 py-2 rounded-full text-white"
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
  container: {
    flex: 1,
    width: "100%",
  },
  accordionStyle: {
    backgroundColor: "white",
    width: 400,
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
    elevation: 5,
    width: "100%",
    borderRadius: "none",
    backgroundColor: "white",
  },
  chipMargin: {
    marginLeft: 10,
  },
});
