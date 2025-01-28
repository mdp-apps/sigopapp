import { useThemeColor } from "@/presentation/theme/hooks";

import { Stack } from "expo-router";

const ConductorLayout = () => {
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
        name="ver-req-conductor/index"
        options={{
          title: "Requerimientos",
        }}
      />

      <Stack.Screen
        name="detalle-conductor/index"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
};

export default ConductorLayout;
