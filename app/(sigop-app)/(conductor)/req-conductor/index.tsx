import React, { useEffect } from "react";

import { View, ScrollView, Alert } from "react-native";
import { ActivityIndicator, Button, Divider } from "react-native-paper";
import { router } from "expo-router";

import { useVisibility } from "@/presentation/shared/hooks";
import { useDriverReqsByRut } from "@/presentation/req/hooks";
import { useAuthStore, UserProfile } from "@/presentation/auth/store";

import { ImgBackgroundLayout } from "@/presentation/shared/layouts";
import {
  ThemedButton,
  ThemedDialog,
  ThemedModal,
  ThemedText,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { FabMenu } from "@/presentation/menu/components";
import { DriverReqCard } from "@/presentation/req/components";
import { driverReqSchema } from "@/presentation/shared/validations";

import { Colors, REQ_TYPE } from "@/config/constants";
import { STAGE } from "@/config/api/sigopApi";

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
    <ImgBackgroundLayout className="justify-center py-5 mt-4">
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
        onPress={showModal}
      >
        Información
      </Button>

      <View className="flex w-full gap-3 my-7">
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

        {STAGE === "test" && (
          <ThemedButton
            className="bg-light-green text-white px-4 py-6 rounded-xl"
            onPress={() => router.push("/menu-supervisor")}
          >
            <ThemedText variant="h3" className="font-ruda text-white">
              Supervisor
            </ThemedText>
          </ThemedButton>
        )}
      </View>

      {isLoadingDriverReqs ? (
        <ActivityIndicator animating={true} color={Colors.light.tomato} />
      ) : (
        isVisibleCard && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex gap-5">
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
                
            </View>
          </ScrollView>
        )
      )}

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

      <FabMenu />
    </ImgBackgroundLayout>
  );
};

export default ReqConductorScreen;
