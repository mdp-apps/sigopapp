import React from "react";

import { View } from "react-native";

import { useAuthStore, UserProfile } from "@/presentation/auth/store";

import { ThemedView } from "@/presentation/theme/components";
import { FabMenu, MenuCard } from "@/presentation/menu/components";

import { DriverReq } from "@/presentation/req/components";
import { SupervisorMenu } from "@/presentation/supervisor/components";

const MenuScreen = () => {
  const { profile } = useAuthStore();

  return (
    <>
      {profile === UserProfile.driver && <DriverReq />}

      {profile === UserProfile.supervisor && <SupervisorMenu />}

      {profile === UserProfile.customer && (
        <ThemedView className="justify-center items-center" margin safe>
          <View className="flex-row gap-2 justify-between my-2">
            <MenuCard
              text="Req. Cliente"
              route="/req-cliente"
              iconSource="playlist-play"
            />

            <MenuCard
              text="Movimientos internos"
              route="/mov-interno-cliente"
              iconSource="playlist-play"
            />
          </View>

          <View className="flex-row justify-between my-2">
            <MenuCard
              text="Requerimiento en curso"
              route="/ver-req-conductor"
              iconSource="playlist-play"
            />

            <MenuCard
              text="Supervisor"
              route="/menu-supervisor"
              iconSource="account-hard-hat"
            />
          </View>
        </ThemedView>
      )}

      <FabMenu />
    </>
  );
};

export default MenuScreen;
