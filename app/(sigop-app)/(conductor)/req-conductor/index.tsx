import React, { useEffect, useState } from "react";

import { View, ScrollView, Alert } from "react-native";
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
import { driverReqSchema } from "@/presentation/shared/validations";

import { Colors, REQ_TYPE } from "@/config/constants";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ReqConductorScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof driverReqSchema>>({
    resolver: zodResolver(driverReqSchema),
    defaultValues: {
     rut: "",
    },
  });

  const { user } = useAuthStore();

  const {
    isVisible: isVisibleDialog,
    show: showDialog,
    hide: hideDialog,
  } = useVisibility();

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const { isVisible: isVisibleCard, show: showCard } = useVisibility();

  const {
    driverReqs,
    reqType,
    isLoadingDriverReqs,
    changeReqType
  } = useDriverReqsByRut(user?.isDriver ? user?.rut : getValues("rut"));

  useEffect(() => {
    if (errors.rut) {
      Alert.alert("Error", errors.rut.message);
    }
  }, [errors]);

  const handleReqType = (value: number) => {
    changeReqType(value);

    user?.isDriver ? showCard() : showDialog();
  };

  const onSubmit = () => {
    hideDialog();
    showCard();
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
        isVisibleCard && (
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

      <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
        <Text variant="bodyLarge">
          * Revise que la patente coincida con su camión. {"\n"} {"\n"}
          Despacho: Carga de productos. {"\n"}
          Recepción: Entrega de carga a Muelles de Penco.
        </Text>
      </ThemedModal>

      <ThemedDialog
        isShowDialog={isVisibleDialog}
        title="Ingrese el RUT"
        description="Sin puntos y con guión"
        inputOptions={{
          control: control,
          placeholder: "RUT",
          keyboardType: "numbers-and-punctuation",
        }}
        handleDialogCancel={hideDialog}
        handleDialogAccept={handleSubmit(onSubmit)}
      />
    </ImgBackgroundLayout>
  );
};

export default ReqConductorScreen;
