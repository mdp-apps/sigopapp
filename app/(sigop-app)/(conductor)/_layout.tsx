import { Stack } from "expo-router";

const ConductorLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="req-conductor/index"
        options={{
          headerShown: false,
        }}
      />

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
