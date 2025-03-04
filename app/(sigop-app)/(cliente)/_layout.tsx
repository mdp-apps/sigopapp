import React from "react";

import { Colors } from "@/config/constants";
import { Stack } from "expo-router";

const ClienteLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        headerTintColor: Colors.light.background,
        headerStyle: {
          backgroundColor: Colors.light.primary,
        },
        headerTitleStyle: {
          fontFamily: "Ruda",
        },
      }}
    >
      <Stack.Screen
        name="mov-interno-cliente/index"
        options={{
          headerTitle: "Movimientos internos",
        }}
      />

      <Stack.Screen
        name="req-cliente/index"
        options={{
          headerTitle: "Requerimientos cliente",
        }}
      />
    </Stack>
  );
};

export default ClienteLayout;
