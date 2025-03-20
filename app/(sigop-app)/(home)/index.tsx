import React from "react";

import { View } from "react-native";

import { useAuthStore } from "@/presentation/auth/store";

import { ThemedText, ThemedView } from "@/presentation/theme/components";
import {
  FabMenu,
  ForemanMenu,
  PlannerMenu,
  SupervisorMenu,
} from "@/presentation/menu/components";
import { DriverReq } from "@/presentation/req/components";

import { UserProfile } from "@/infrastructure/entities";
import { USER_PROFILES } from "@/config/constants";

const MenuScreen = () => {
  const { profile, user } = useAuthStore();

  return (
    <ThemedView safe={profile !== UserProfile.driver}>
      {profile !== UserProfile.driver && (
        <View className="justify-center items-center m-4 mb-0">
          <ThemedText
            variant="h1"
            className="font-bold text-light-primary uppercase w-full text-center"
          >
            {USER_PROFILES[profile as keyof typeof USER_PROFILES]}
          </ThemedText>
          <ThemedText
            variant="h4"
            className="font-semibold text-slate-600 w-full text-center"
          >
            {user?.name} {user?.paternalLastname} {user?.maternalLastname}
          </ThemedText>
        </View>
      )}

      {profile === UserProfile.driver && <DriverReq />}
      {profile === UserProfile.supervisor && <SupervisorMenu />}
      {profile === UserProfile.foreman && <ForemanMenu />}
      {profile === UserProfile.planner && <PlannerMenu />}

      <FabMenu />
    </ThemedView>
  );
};

export default MenuScreen;
