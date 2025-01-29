import React from "react";
import { View } from "react-native";

import { router } from "expo-router";

import { useAuthStore, UserProfile } from "@/presentation/auth/store";
import { BackgroundLayout } from "@/presentation/shared/layouts";
import { ThemedButton, ThemedText } from "@/presentation/theme/components";

const SupervisorScreen = () => {
  const { profile } = useAuthStore();

  return (
    <BackgroundLayout
      className="justify-center"
    >
        <ThemedButton
          className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
          onPress={() => router.push("/req-patente")}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Requerimientos
          </ThemedText>
        </ThemedButton>

        <View className="flex w-full gap-4">
          <ThemedButton
            className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
            onPress={() => router.push("/")}
          >
            <ThemedText variant="h3" className="font-ruda text-white">
              Ticket de entrada
            </ThemedText>
          </ThemedButton>

          <ThemedButton
            className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
            onPress={() => router.push("/ver-req-conductor")}
          >
            <ThemedText variant="h3" className="font-ruda text-white">
              Requerimiento en curso
            </ThemedText>
          </ThemedButton>
        </View>

      <View className="flex w-full gap-4 mt-4">
        <ThemedButton
          className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
          onPress={() => router.push("/ver-req-supervisor")}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Requerimientos
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
          onPress={() => router.push("/stock-actual")}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Stock
          </ThemedText>
        </ThemedButton>

        <ThemedButton
          className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
          onPress={() => router.push("/observaciones")}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Observaciones
          </ThemedText>
        </ThemedButton>
      </View>
    </BackgroundLayout>
  );
};

export default SupervisorScreen;
