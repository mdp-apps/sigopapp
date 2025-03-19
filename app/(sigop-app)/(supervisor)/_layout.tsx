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
        name="produccion-paletizada/index"
        options={{
          headerTitle: "Producción paletizada",
        }}
      />

      <Stack.Screen
        name="configurar-pallets-req/index"
        options={{
          headerTitle: "Requerimiento paletizado",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="estados-req/index"
        options={{
          headerTitle: "Estados de requerimiento",
        }}
      />

      <Stack.Screen
        name="ver-estados-req/index"
        options={{
          headerTitle: reqCode
            ? `Estados de req. ${reqCode}`
            : "Estados de requerimiento",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="observaciones-req/index"
        options={{
          headerTitle: "Observaciones de req.",
        }}
      />

      <Stack.Screen
        name="observaciones/index"
        options={{
          headerTitle: reqCode
            ? `Observaciones de req. ${reqCode}`
            : "Observaciones",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="modificar-sacos-req/index"
        options={{
          headerTitle: "Modificar N° de sacos",
        }}
      />

      <Stack.Screen
        name="modificar-sacos/index"
        options={{
          headerTitle: "Modificar N° de sacos",
          headerTitleAlign: "center",
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
    </Stack>
  );
};

export default SupervisorLayout;
