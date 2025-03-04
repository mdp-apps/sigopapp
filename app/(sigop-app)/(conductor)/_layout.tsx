import React from "react";

import { useThemeColor } from "@/presentation/theme/hooks";

import { Stack, useLocalSearchParams } from "expo-router";

const ConductorLayout = () => {
  const { reqCode } = useLocalSearchParams();
  const backgrounColor = useThemeColor({}, "background");

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: backgrounColor,
        },
      }}
    >
      <Stack.Screen
        name="ingreso-conductor/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="detalle-req/index"
        options={{
          headerShown: true,
          headerTitle: reqCode
            ? `Detalle de Req. ${reqCode}`
            : "Detalle de Requerimiento",
          headerTitleStyle: {
            fontFamily: "Ruda",
          },
        }}
      />

      <Stack.Screen
        name="ver-req-conductor/index"
        options={{
          title: "Requerimientos",
        }}
      />
    </Stack>
  );
};

export default ConductorLayout;
