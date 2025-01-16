import React, { useState } from "react";

import { View, ScrollView } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

import { useVisibility } from "@/presentation/shared/hooks";
import { useDriverReqsByRut } from "@/presentation/req/hooks";
import { useAuthStore } from "@/presentation/auth/store";

import { ImgBackgroundLayout } from "@/presentation/shared/layouts";
import {
  ThemedButton,
  ThemedDialog,
  ThemedModal,
  ThemedText,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { DriverReqCard } from "@/presentation/req/components";

import { Colors, REQ_TYPE } from "@/config/constants";

const ReqConductorScreen = () => {
  const [reqType, setReqType] = useState(0);
  const [inputRutValue, setInputRutValue] = useState("");

  const { user } = useAuthStore();

  const {
    isVisible: isDialogVisible,
    show: showDialog,
    hide: hideDialog,
  } = useVisibility();

  const {
    isVisible: isModalVisible,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const { isVisible: isCardVisible, show: showCard } = useVisibility();

  const { driverReqs, isLoadingDriverReqs } = useDriverReqsByRut(
    user?.isDriver ? user?.rut : inputRutValue,
    reqType
  );

  const handleReqType = (value: number) => {
    setReqType(value);

    user?.isDriver ? showCard() : showDialog();
  };

  return (
    <ImgBackgroundLayout source={require("../../../../assets/camion.jpg")}>
      <Button
        style={{
          backgroundColor: Colors.light.tertiary,
        }}
        labelStyle={{
          color: "black",
          fontSize: 18,
          fontFamily: "Ruda-Bold",
        }}
        icon="information-outline"
        mode="contained-tonal"
        onPress={showModal}
      >
        Información
      </Button>

      <View className="flex w-full gap-3 my-4">
        <ThemedButton
          className="bg-blue-800 text-white px-4 py-6 rounded-xl"
          onPress={() => handleReqType(REQ_TYPE.despacho)}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Despacho
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="bg-light-tomato text-white px-4 py-6 rounded-xl"
          onPress={() => handleReqType(REQ_TYPE.recepcion)}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Recepción
          </ThemedText>
        </ThemedButton>
      </View>

      {isLoadingDriverReqs ? (
        <ActivityIndicator animating={true} color={Colors.light.tomato} />
      ) : (
        isCardVisible && (
          <ScrollView>
            {driverReqs.length > 0 ? (
              driverReqs.map((item, index) => (
                <DriverReqCard key={index} req={item} />
              ))
            ) : (
              <NoDataCard
                message={`No hay ${
                  REQ_TYPE.despacho === reqType ? "Despachos" : "Recepciones"
                }`}
                iconSource={
                  REQ_TYPE.despacho === reqType ? "truck-minus" : "truck-plus"
                }
              />
            )}
          </ScrollView>
        )
      )}

      <ThemedModal isVisible={isModalVisible} hideModal={hideModal}>
        <Text variant="bodyLarge">
          * Revise que la patente coincida con su camión. {"\n"} {"\n"}
          Despacho: Carga de productos. {"\n"}
          Recepción: Entrega de carga a Muelles de Penco.
        </Text>
      </ThemedModal>

      <ThemedDialog
        isShowDialog={isDialogVisible}
        title="Ingrese el RUT"
        description="Sin puntos y con guión"
        inputOptions={{
          onChangeText: (text) => setInputRutValue(text),
          value: inputRutValue,
          placeholder: "RUT",
          keyboardType: "numbers-and-punctuation",
        }}
        handleDialogCancel={hideDialog}
        handleDialogAccept={() => {
          hideDialog();
          showCard();
        }}
      />
    </ImgBackgroundLayout>
  );
};

export default ReqConductorScreen;
