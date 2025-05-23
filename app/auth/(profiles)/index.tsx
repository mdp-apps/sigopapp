import React from "react";

import { View } from "react-native";

import { useAuthStore } from "@/presentation/auth/store";

import { AuthBaseLayout } from "@/presentation/shared/layouts";
import { ThemedButton, ThemedText } from "@/presentation/theme/components";
import { STAGE } from "@/config/api/sigopApi";
import { UserProfile } from "@/infrastructure/entities";

const ProfileMenuScreen = () => {
  const { selectProfile } = useAuthStore();

  return (
    <AuthBaseLayout>
      <ThemedText
        variant="h2"
        className="font-ruda-bold text-light-primary mb-2"
      >
        Selecciona tu perfil
      </ThemedText>

      <View className="flex gap-4 w-full m-3">
        <View className="flex flex-row justify-evenly">
          <View className="flex flex-col items-center gap-1">
            <ThemedButton
              testID="driver-button"
              variant="icon"
              onPress={() => selectProfile(UserProfile.driver)}
              className="rounded-full bg-light-primary"
              iconName="dump-truck"
              iconSize={60}
              iconColor="white"
            />
            <ThemedText className="font-semibold text-md text-center text-light-primary">
              Conductor
            </ThemedText>
          </View>

          <View className="flex flex-col items-center gap-1">
            <ThemedButton
              testID="supervisor-button"
              variant="icon"
              onPress={() => selectProfile(UserProfile.supervisor)}
              className="rounded-full bg-light-primary "
              iconName="account-hard-hat"
              iconSize={60}
              iconColor="white"
            />
            <ThemedText className="font-semibold text-md text-center text-light-primary">
              Supervisor
            </ThemedText>
          </View>
        </View>

        <View className="flex flex-row justify-evenly">
          <View className="flex flex-col items-center gap-1">
            <ThemedButton
              testID="planner-button"
              variant="icon"
              onPress={() => selectProfile(UserProfile.planner)}
              className="rounded-full bg-light-primary"
              iconName="account-edit"
              iconSize={60}
              iconColor="white"
            />

            <ThemedText className="font-semibold text-md text-center text-light-primary">
              Planificador
            </ThemedText>
          </View>

          <View className="flex flex-col items-center gap-1">
            <ThemedButton
              testID="foreman-button"
              variant="icon"
              onPress={() => selectProfile(UserProfile.foreman)}
              className="rounded-full bg-light-primary"
              iconName="account-filter"
              iconSize={60}
              iconColor="white"
            />

            <ThemedText className="font-semibold text-md text-center text-light-primary">
              Capataz
            </ThemedText>
          </View>
        </View>
      </View>
    </AuthBaseLayout>
  );
};

export default ProfileMenuScreen;
