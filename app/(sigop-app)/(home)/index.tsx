import React from "react";
import { View } from 'react-native';

import { useAuthStore, UserProfile } from "@/presentation/auth/store";

import { ImgBackgroundLayout } from "@/presentation/shared/layouts";
import { FabMenu, MenuCard } from "@/presentation/menu/components";

import { STAGE } from "@/config/api/sigopApi";

const MenuScreen = () => {
const { profile } = useAuthStore();

  return (
    <>
      <ImgBackgroundLayout className="justify-center">
        {profile === UserProfile.driver && (
          <>
            <View className="flex-row justify-between my-2">
              {STAGE === "test" && (
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
      </ImgBackgroundLayout>

      <FabMenu />
    </>
  );
};

export default MenuScreen;
