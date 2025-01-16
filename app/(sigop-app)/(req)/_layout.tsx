import { Stack, useLocalSearchParams } from "expo-router";

import { Colors } from "@/config/constants";

const PruebaLayout = () => {
  const { reqCode } = useLocalSearchParams();


  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.light.background },
      }}
    >
      <Stack.Screen
        name="req-patente/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="log-estados/index"
        options={{
          headerTitle: reqCode ? `Trazabilidad de Req. ${reqCode}` : "Trazabilidad",
          headerShown: true,
          headerTintColor: Colors.light.background,
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleStyle: {
            fontFamily: "Ruda",
          },
        }}
      />

      <Stack.Screen
        name="detalle-req/index"
        options={{
          headerShown: true,
          headerTitle: reqCode ? `Detalle de Req. ${reqCode}` : "Detalle de Requerimiento",
          headerTitleStyle: {
            fontFamily: "Ruda",
          },
        }}
      />
    </Stack>
  );
};

export default PruebaLayout;
