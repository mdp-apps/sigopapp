import React from "react";

import { Stack } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";

const ClienteLayout = () => {
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
    ></Stack>
  );
};

export default ClienteLayout;
