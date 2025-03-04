import React from "react";

import { ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import { Link } from "expo-router";

import { useReqStore } from "../store";
import { ThemedButton, ThemedChip } from "@/presentation/theme/components";

import { Req } from "@/infrastructure/entities";
import { Formatter } from "@/config/helpers";
import { Colors, REQ_STATUS, REQ_STATUS_BG_COLOR } from "@/config/constants";

interface SupervisorReqCardProps {
  children: React.ReactNode;
  req: Req;
}

export const ReqCard = ({ children, req }: SupervisorReqCardProps) => {
  const { showObservationModal, showModalExitTicket } = useReqStore();

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor:
            REQ_STATUS_BG_COLOR[req?.status] || Colors.light.lightWhite,
        },
      ]}
    >
      <Card.Title
        title={`Req. ${req.reqCode}`}
        titleStyle={{ fontSize: 22, fontFamily: "Ruda-Bold" }}
        subtitle={`${req.date} [T${req.turn}]  - ${req.nameReqFormat}`}
        subtitleStyle={{ fontSize: 15, fontFamily: "Ruda-Bold" }}
      />

      <Card.Content style={styles.cardContent}>
        <ThemedChip
          tooltipTitle="Conductor"
          iconSource="steering"
          text={req.driverName}
        />

        <ThemedChip
          tooltipTitle="RUT Conductor"
          iconSource="card-account-details"
          text={Formatter.formatRut(req.rutDriver)}
        />

        <ThemedChip
          tooltipTitle="Patente"
          iconSource="car-info"
          text={req.vehiclePatent}
        />

        <ThemedChip
          tooltipTitle="Cliente"
          iconSource="account-tie"
          text={req.customerAbbr}
        />

        <ThemedChip
          tooltipTitle="Transportista"
          iconSource="truck-delivery"
          text={req.carrierName}
        />
      </Card.Content>

      <Card.Actions>
        <ScrollView contentContainerStyle={styles.scrollBar} horizontal>
          {req.observation && (
            <ThemedButton
              text="Observación"
              className="bg-blue-800 text-white py-3 rounded-full"
              onPress={() => showObservationModal(req.observation)}
            />
          )}

          {children}

          <Link
            className="bg-blue-800 px-6 py-3 rounded-full text-white"
            href={{
              pathname: "/log-estados",
              params: {
                reqCode: req.reqCode,
                customerAbbr: req.customerAbbr,
                vehiclePatent: req.vehiclePatent,
                carrierName: req.carrierName,
              },
            }}
          >
            Trazabilidad
          </Link>

          {(req.status > REQ_STATUS.ejecucion &&
            req.status < REQ_STATUS.finalizado) ||
            (req.status == REQ_STATUS.anulado && (
              <ThemedButton
                text=" Ticket salida"
                className="bg-blue-800 text-white py-3 rounded-full"
                onPress={() => showModalExitTicket(req)}
              />
            ))}
        </ScrollView>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    fontFamily: "Ruda",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 8,
  },
  scrollBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
  },
});
