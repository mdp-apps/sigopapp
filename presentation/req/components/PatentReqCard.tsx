import { Text } from "react-native";
import { Card } from "react-native-paper";

import { Link } from "expo-router";

import { Req } from "@/infrastructure/entities";

interface PatentReqCardProps {
  req: Req;
}

export const PatentReqCard = ({ req }: PatentReqCardProps) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Title title={req.name} subtitle={req.description} />
      <Card.Content>
        <Text>Patente: {req.patent ?? "N/A"}</Text>
        <Text>Cliente: {req.customer ?? "N/A"}</Text>
        <Text>Fecha: {req.date}</Text>
      </Card.Content>
      <Card.Actions>
        <Link
          className="px-6 py-3 rounded-full text-light-primary border border-light-primary"
          href={{
            pathname: "/detalle-req",
            params: {
              carrierName: req.carrierName,
              customerAbbr: req.customerAbbr,
              reqCode: req.internalCode,
              reqType: `${req.reqType}${req.formatType}`,
              vehiclePatent: req.vehiclePatent,
            },
          }}
        >
          Ver Detalle
        </Link>

        <Link
          className="bg-light-primary px-6 py-3 rounded-full text-white"
          href={{
            pathname: "/log-estados",
            params: {
              carrierName: req.carrierName,
              customerAbbr: req.customerAbbr,
              reqCode: req.internalCode,
              vehiclePatent: req.vehiclePatent,
            },
          }}
        >
          Trazabilidad
        </Link>
      </Card.Actions>
    </Card>
  );
};
