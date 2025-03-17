import React from "react";

import { StyleSheet, View } from "react-native";
import { Card, Divider } from "react-native-paper";

import {
  ThemedAccordion,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";

import { InternalMovement } from "@/infrastructure/entities";
import { INTERNAL_MOV_STATUS_BG_COLOR } from "@/config/constants";
import { useThemeColor } from "@/presentation/theme/hooks";
import { Formatter } from "@/config/helpers";

interface InternalMovCardProps {
  movement: InternalMovement;
}

export const InternalMovCard = ({ movement }: InternalMovCardProps) => {
  const darkGrayColor = useThemeColor({}, "darkGray");

  return (
    <ThemedAccordion
      title={`Mov ${movement.id}. ${movement.productName}`}
      description={`${movement.plannedDate} (T${movement.turn}) - ${movement.customerName}`}
      titleStyle={{
        fontSize: 15,
        fontFamily: "sans-serif",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: darkGrayColor,
      }}
      descriptionStyle={{
        fontSize: 15,
        fontFamily: "sans-serif",
        color: darkGrayColor,
      }}
    >
      <Card.Content>
        <ThemedView className="gap-2" bgColor="white">
          <ThemedText
            variant="h5"
            className="text-light-dark-gray uppercase font-semibold"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {movement.movementTypeName}
          </ThemedText>

          <ThemedView
            className="flex-1 flex-row items-center gap-3"
            bgColor="white"
          >
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                <View
                  style={{
                    backgroundColor:
                      INTERNAL_MOV_STATUS_BG_COLOR[movement.status],
                    width: 12,
                    height: 12,
                  }}
                />
                <ThemedText
                  variant="h6"
                  className="text-gray-600 uppercase font-semibold"
                >
                  Estado:
                </ThemedText>
              </View>

              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                style={{ textTransform: "capitalize" }}
              >
                {movement.statusName}
              </ThemedText>
            </View>

            {movement.diCode && (
              <ThemedText
                variant="h6"
                className="text-gray-600 uppercase font-semibold"
              >
                DI: {movement.diCode}
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        <Divider className="my-3" />

        <ThemedView className="flex-row mr-5" bgColor="white">
          <ThemedText
            variant="h5"
            className="flex-1 text-light-dark-gray uppercase font-bold mt-3"
            adjustsFontSizeToFit
          >
            Origen
          </ThemedText>

          <View className="flex-1 gap-2">
            <ThemedText
              variant="h5"
              className="text-gray-600 uppercase font-semibold"
              adjustsFontSizeToFit
            >
              {movement.warehouseName}
            </ThemedText>

            <View className="flex-row gap-2">
              <ThemedText
                variant="h6"
                className="text-gray-950 font-semibold"
                adjustsFontSizeToFit
              >
                Planificado KG:
              </ThemedText>
              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                adjustsFontSizeToFit
              >
                {Formatter.numberWithDots(movement.totalQuantityKG)}
              </ThemedText>
            </View>

            <View className="flex-row gap-2">
              <ThemedText
                variant="h6"
                className="text-gray-950 font-semibold"
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                Pendiente KG:
              </ThemedText>
              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                adjustsFontSizeToFit
              >
                {Formatter.numberWithDots(movement.pendingQuantityKG)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <Divider className="my-3" />

        <ThemedView className="flex-row mr-5" bgColor="white">
          <ThemedText
            variant="h5"
            className="flex-1 text-light-dark-gray uppercase font-bold mt-3"
            adjustsFontSizeToFit
          >
            Destino
          </ThemedText>

          <View className="flex-1 gap-2">
            <ThemedText
              variant="h5"
              className="text-gray-600 uppercase font-semibold"
              adjustsFontSizeToFit
            >
              {movement.warehouseDestinyName}
            </ThemedText>

            <View className="flex-row gap-2">
              <ThemedText
                variant="h6"
                className="text-gray-950 font-semibold"
                adjustsFontSizeToFit
              >
                Verificado KG:
              </ThemedText>
              <ThemedText
                variant="h6"
                className="text-gray-600 font-semibold"
                adjustsFontSizeToFit
              >
                {Formatter.numberWithDots(movement.verifiedQuantityKG)}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </Card.Content>
    </ThemedAccordion>
  );

  /* return (
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
  ); */
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
