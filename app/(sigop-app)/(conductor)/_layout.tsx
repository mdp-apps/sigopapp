import React from "react";

import { useThemeColor } from "@/presentation/theme/hooks";

import { Stack } from "expo-router";

const ConductorLayout = () => {

  const backgroundColor = useThemeColor({}, "background");

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="ingreso-conductor/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ConductorLayout;
