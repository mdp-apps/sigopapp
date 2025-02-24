import React from "react";

import { router } from "expo-router";

import {
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";

const SupervisorScreen = () => {
  return (
    <ThemedView className="justify-center items-center gap-4" margin safe>
      <ThemedButton
        className="bg-light-primary text-white px-4 py-6 rounded-xl w-full"
        onPress={() => router.push("/req-patente")}
      >
        <ThemedText variant="h3" className="font-ruda text-white">
          Requerimientos
        </ThemedText>
      </ThemedButton>

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
          onPress={() => router.push("/observaciones")}
        >
          <ThemedText variant="h3" className="font-ruda text-white">
            Observaciones
          </ThemedText>
        </ThemedButton>
    </ThemedView>
  );
};

export default SupervisorScreen;
