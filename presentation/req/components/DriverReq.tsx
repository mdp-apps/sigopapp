import React, { useEffect } from "react";

import { View, ScrollView, Alert } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { router } from "expo-router";

import { useVisibility } from "@/presentation/shared/hooks";
import { useDriverReqsByRut } from "@/presentation/req/hooks";
import { useAuthStore, UserProfile } from "@/presentation/auth/store";

import {
  ThemedButton,
  ThemedDialog,
  ThemedModal,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { DriverReqCard } from "@/presentation/req/components";
import { driverReqSchema } from "@/presentation/shared/validations";

import { Colors, REQ_TYPE } from "@/config/constants";
import { STAGE } from "@/config/api/sigopApi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const DriverReq = () => {
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

  const { user, profile } = useAuthStore();

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

  const { driverReqs, reqType, isLoadingDriverReqs, changeReqType } =
    useDriverReqsByRut(
      profile === UserProfile.driver ? user?.rut! : getValues("rut")
    );
  

  useEffect(() => {
    if (errors.rut) {
      Alert.alert("Error", errors.rut.message);
    }
  }, [errors]);

  const handleReqType = (value: number) => {
    changeReqType(value);

    profile === UserProfile.driver ? showCard() : showDialog();
  };

  const onSubmit = () => {
    hideDialog();
    showCard();
  };

  return (
    <ThemedView className="flex-1 justify-start items-start my-4" margin safe>
      <ThemedButton
        variant="icon"
        className="items-start bg-light-white !px-2 !py-2 rounded-lg"
        iconName="information-circle-outline"
        iconColor="black"
        iconSize={24}
        onPress={showModal}
      />

      <View className="w-full gap-3 mt-3 mb-7">
        <ThemedButton
          className="bg-light-primary text-white px-4 py-6 rounded-xl"
          onPress={() => handleReqType(REQ_TYPE.despacho)}
        >
          <ThemedText
            variant="h3"
            className="font-ruda-bold text-white uppercase w-full text-center"
          >
            Despacho
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="bg-teal-600 text-white px-4 py-6 rounded-xl"
          onPress={() => handleReqType(REQ_TYPE.recepcion)}
        >
          <ThemedText
            variant="h3"
            className="font-ruda-bold text-white uppercase w-full text-center"
          >
            Recepción
          </ThemedText>
        </ThemedButton>
      </View>

      <ScrollView className="w-full">
        <View className="w-full min-h-56">
          {isLoadingDriverReqs ? (
            <ActivityIndicator
              animating={true}
              color={Colors.light.tomato}
              size="large"
              className="mx-auto"
            />
          ) : (
            isVisibleCard && (
              <View className="gap-5">
                {driverReqs.length > 0 ? (
                  driverReqs.map((item, index) => (
                    <DriverReqCard key={index} req={item} />
                  ))
                ) : (
                  <NoDataCard
                    message={`No hay ${
                      REQ_TYPE.despacho === reqType
                        ? "Despachos"
                        : "Recepciones"
                    }`}
                    iconSource={
                      REQ_TYPE.despacho === reqType
                        ? "truck-minus"
                        : "truck-plus"
                    }
                  />
                )}
              </View>
            )
          )}
        </View>
      </ScrollView>

      <ThemedModal
        isVisible={isVisibleModal}
        hideModal={hideModal}
        isNativeModal
      >
        <ThemedText variant="h5">
          * Revise que su carga y patente sean los correctos.
        </ThemedText>

        <Divider style={{ marginVertical: 10 }} />

        <View className="gap-4">
          <ThemedText variant="h4" className="font-bold">
            Despacho:{" "}
            <ThemedText variant="h5" className="font-normal">
              Carga de productos.
            </ThemedText>
          </ThemedText>

          <ThemedText variant="h4" className="font-bold">
            Recepción:{" "}
            <ThemedText variant="h5" className="font-normal">
              Entrega de carga a Muelles de Penco.
            </ThemedText>
          </ThemedText>
        </View>
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
    </ThemedView>
  );
};
