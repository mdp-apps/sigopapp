import React from "react";
import { View, Text, ScrollView } from 'react-native';

import { useVisibility } from "@/presentation/shared/hooks";
import { useAuthStore, UserProfile } from "@/presentation/auth/store";

import { ImgBackgroundLayout } from "@/presentation/shared/layouts";
import { FabMenu, MenuCard } from "@/presentation/menu/components";
import { ThemedButton, ThemedModal, ThemedText } from "@/presentation/theme/components";

import { Formatter } from "@/config/helpers";
import { PRIVACY_POLICY } from "@/config/constants";
import { STAGE } from "@/config/api/sigopApi";
import { useThemeColor } from "@/presentation/theme/hooks";

const MenuScreen = () => {
  const darkGrayColor = useThemeColor({},"darkGray")

  const {
    hide: hideModal,
    isVisible: isVisibleModal,
    show: showModal,
  } = useVisibility();

  const { user, profile } = useAuthStore();

  return (
    <>
      <ImgBackgroundLayout
        source={require("../../../assets/muelle.jpg")}
        className="justify-center"
      >
        <View className="py-2 px-4 mb-4 rounded-2xl bg-light-secondary">
          <ThemedText variant="h3" className="text-center text-black font-ruda">
            Hola, {Formatter.capitalize(user?.name!)}{" "}
            {Formatter.capitalize(user?.paternalLastname!)}{" "}
            {Formatter.initialLetter(user?.maternalLastname!)} 👋{" "}
          </ThemedText>
        </View>

        {profile === UserProfile.driver && (
          <>
            <View className="flex-row justify-between my-2">
              <MenuCard
                text="Conductor"
                route="/req-conductor"
                iconSource="steering"
              />

              {STAGE === "dev" && (
                <MenuCard
                  text="Supervisor"
                  route="/menu-supervisor"
                  iconSource="account-hard-hat"
                />
              )}
            </View>

            {STAGE === "test" && (
              <View className="flex-row justify-center my-2">
                <MenuCard
                  text="Pruebas"
                  route="/prueba"
                  iconSource="test-tube"
                />

                <View className="flex-1 mx-1" />
              </View>
            )}
          </>
        )}

        {profile === UserProfile.customer && (
          <>
            <View className="flex-row justify-between my-2">
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

            {STAGE === "test" && (
              <View className="flex-row justify-center my-2">
                <MenuCard
                  text="Stock actual"
                  route="/stock-actual-cliente"
                  iconSource="archive-eye"
                />
              </View>
            )}

            <View className="flex-row justify-between my-2 ">
              {STAGE === "test" && (
                <MenuCard
                  text="Ticket de entrada"
                  route="/req-conductor"
                  iconSource="qrcode"
                />
              )}

              <MenuCard
                text="Requerimiento en curso"
                route="/ver-req-conductor"
                iconSource="playlist-play"
              />

              <View className="flex-1 mx-1" />
            </View>
          </>
        )}

        <ThemedModal
          isVisible={isVisibleModal}
          hideModal={hideModal}
          isNativeModal
        >
          <ThemedButton
            variant="icon"
            className="absolute top-2 right-2 z-50 py-0 px-0"
            onPress={hideModal}
            iconName="close-circle"
            iconColor={darkGrayColor}
            iconSize={36}
          />
          <ScrollView>
            <Text>{PRIVACY_POLICY}</Text>
          </ScrollView>
        </ThemedModal>
      </ImgBackgroundLayout>

      <FabMenu showModal={showModal} />
    </>
  );
};

export default MenuScreen;
