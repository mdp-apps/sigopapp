import { Colors } from "@/config/constants";
import { Stack } from "expo-router";

const PruebaLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: true,
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
    </Stack>
  );
};

export default PruebaLayout;
