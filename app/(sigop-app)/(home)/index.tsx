import React from "react";
import { View, Text, ScrollView } from "react-native";

import { Button } from "react-native-paper";

import { useVisibility } from "@/presentation/shared/hooks";
import { useAuthStore } from "@/presentation/auth/store";

import { ImgBackgroundLayout } from "@/presentation/shared/layouts";
import { FabMenu, MenuCard } from "@/presentation/menu/components";
import { ThemedModal, ThemedText } from "@/presentation/theme/components";

import { Formatter } from "@/config/helpers";
import { PRIVACY_POLICY } from "@/config/constants";
import { STAGE } from "@/config/api/sigopApi";

const MenuScreen = () => {
  const {
    hide: hideModal,
    isVisible: isVisibleModal,
    show: showModal,
  } = useVisibility();

  const { user } = useAuthStore();

  return (
    <>
      <ImgBackgroundLayout source={require("../../../assets/muelle.jpg")}>
        <View className="absolute top-40 py-2 px-4 m-4 rounded-2xl overflow-hidden bg-light-secondary">
          <ThemedText variant="h3" className="text-center text-black font-ruda">
            Hola, {Formatter.capitalize(user?.name!)}{" "}
            {Formatter.capitalize(user?.paternalLastname!)}{" "}
            {Formatter.initialLetter(user?.maternalLastname!)} 👋{" "}
          </ThemedText>
        </View>
        {user?.isCustomer ? (
          <>
            <View className="flex-row my-2">
              <MenuCard
                text="Requerimientos"
                route="/req-cliente"
                iconSource="playlist-play"
              />

              <MenuCard
                text="Movimientos internos"
                route="/mov-interno-cliente"
                iconSource="playlist-play"
              />
            </View>

            <View className="flex-row my-2">
              <MenuCard
                text="Stock actual"
                route="/stock-actual-cliente"
                iconSource="archive-eye"
              />
            </View>

            <View className="flex-row my-2">
              <MenuCard
                text="Ticket de entrada"
                route="/req-conductor"
                iconSource="qrcode"
              />

              <MenuCard
                text="Requerimiento en curso"
                route="/ver-req-conductor"
                iconSource="playlist-play"
              />
            </View>
          </>
        ) : (
          <>
            <View className="flex-row my-2">
              <MenuCard
                text="Conductor"
                route="/req-conductor"
                iconSource="steering"
              />
              <MenuCard
                text="Supervisor"
                route="/menu-supervisor"
                iconSource="account-hard-hat"
              />
              </View>
              
            {STAGE !== "prod" && (
              <View className="flex-row my-2">
                <View className="flex-1" />

                <MenuCard
                  text="Pruebas"
                  route="/prueba"
                  iconSource="test-tube"
                />
              </View>
            )}
          </>
        )}

        <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
          <ScrollView>
            <Text>{PRIVACY_POLICY}</Text>

            <Button
              buttonColor="blue"
              icon="close"
              mode="contained"
              onPress={hideModal}
            >
              Cerrar
            </Button>
          </ScrollView>
        </ThemedModal>
      </ImgBackgroundLayout>

      <FabMenu showModal={showModal} />
    </>
  );
};

export default MenuScreen;
