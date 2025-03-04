import React from "react";

import { Stack, useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";

const SupervisorLayout = () => {
  const { reqCode } = useGlobalSearchParams();

  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: backgroundColor },
        headerTitleStyle: {
          fontFamily: "Ruda",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="menu-supervisor/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="observaciones/index"
        options={{
          headerTitle: "Observaciones",
        }}
      />

      <Stack.Screen
        name="ver-req-supervisor/index"
        options={{
          headerTitle: "Supervisor",
        }}
      />

      <Stack.Screen
        name="produccion-paletizada/index"
        options={{
          headerTitle: "Producción paletizada",
        }}
      />

      <Stack.Screen
        name="requerimientos/index"
        options={{
          headerTitle: "Requerimientos",
        }}
      />

      <Stack.Screen
        name="mov-internos/index"
        options={{
          headerTitle: "Movimientos internos",
        }}
      />

      <Stack.Screen
        name="saldos/index"
        options={{
          headerTitle: "Saldos",
        }}
      />

      <Stack.Screen
        name="configurar-pallets-req/index"
        options={{
          headerTitle: reqCode ? `Req. ${reqCode}` : "Requerimiento de pallets",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default SupervisorLayout;
