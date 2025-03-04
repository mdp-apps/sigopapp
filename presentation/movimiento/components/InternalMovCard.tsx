import React from "react";

import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider } from "react-native-paper";

import { useReqStore } from "@/presentation/req/store";
import {
  ThemedButton,
  ThemedChip,
  ThemedText,
} from "@/presentation/theme/components";

import { InternalMovement } from "@/infrastructure/entities";
import { Colors, INTERNAL_MOV_STATUS_BG_COLOR } from "@/config/constants";

interface InternalMovCardProps {
  movement: InternalMovement;
}

export const InternalMovCard = ({ movement }: InternalMovCardProps) => {
  const { showObservationModal } = useReqStore();

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor:
            INTERNAL_MOV_STATUS_BG_COLOR[movement?.status] ||
            Colors.light.lightWhite,
        },
      ]}
    >
      <Card.Title
        title={`Mov. ${movement.id} - ${movement.movementTypeName}`}
        titleStyle={{ fontSize: 17, fontFamily: "Ruda-Bold" }}
        subtitle={`Detalle ${movement.detailId} - ${movement.plannedDate} [T${movement.turn}]`}
        subtitleStyle={{ fontSize: 15, fontFamily: "Ruda" }}
      />

      <Card.Content style={styles.cardContent}>
        <ThemedChip
          tooltipTitle="Cliente"
          iconSource="account-tie"
          text={movement.customerName}
          textStyle={{ fontSize: 15 }}
        />

        <ThemedChip
          tooltipTitle="Producto"
          iconSource="asterisk"
          text={movement.productName}
          textStyle={{ fontSize: 15 }}
        />

        <ThemedChip
          tooltipTitle="¿Con cobro?"
          iconSource={movement.cashing === 1 ? "cash-fast" : "cash-minus"}
          text={movement.cashing === 1 ? "Con cobro" : "Sin cobro"}
          textStyle={{ fontSize: 15 }}
        />

        {movement.diCode && (
          <ThemedChip
            tooltipTitle="Código DI"
            iconSource="file-document"
            text={movement.diCode}
            textStyle={{ fontSize: 15 }}
          />
        )}

        {movement.dapiCode && (
          <ThemedChip
            tooltipTitle="Código DAPI"
            iconSource="file-document"
            text={movement.dapiCode}
            textStyle={{ fontSize: 15 }}
          />
        )}

        <ThemedChip
          tooltipTitle="Cantidad planificada KG."
          iconSource="circle-edit-outline"
          text={`Planif. ${movement.totalQuantity} KG.`}
          textStyle={{ fontSize: 15 }}
        />

        <ThemedChip
          tooltipTitle="Cantidad planificada KG."
          iconSource="checkbox-marked-circle-outline"
          text={`Verificado ${movement.verifiedQuantity} KG.`}
          textStyle={{ fontSize: 15 }}
        />

        <Divider className="bg-black h-0.5 my-2" />

        <View className="bg-light-white p-3 rounded-lg mb-3">
          <ThemedText variant="h6" className="mb-3 font-ruda">
            Datos de origen
          </ThemedText>

          <ThemedChip
            tooltipTitle="Bodega origen"
            text={movement.warehouseName}
            textStyle={{ fontFamily: "Ruda" }}
          />

          <ThemedChip
            tooltipTitle="Operación origen"
            text={`${movement.operationCode} - ${movement.operationName}`}
            textStyle={{ fontFamily: "Ruda" }}
          />
        </View>

        <Divider className="bg-black h-0.5 my-2" />

        <View className="bg-light-white p-3 rounded-lg">
          <ThemedText variant="h6" className="mb-3 font-ruda">
            Datos de destino
          </ThemedText>

          <ThemedChip
            tooltipTitle="Bodega destino"
            text={movement.warehouseDestinyName}
            textStyle={{ fontFamily: "Ruda" }}
          />

          <ThemedChip
            tooltipTitle="Operación destino"
            text={`${movement.operationDestinyCode} - ${movement.operationDestinyName}`}
            textStyle={{ fontFamily: "Ruda" }}
          />
        </View>
      </Card.Content>

      <Card.Actions>
        <ScrollView contentContainerStyle={styles.scrollBar} horizontal>
          {movement.observation && (
            <ThemedButton
              text="Observación"
              className="bg-blue-800 text-white py-3 rounded-full"
              onPress={() => showObservationModal(movement.observation)}
            />
          )}
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
