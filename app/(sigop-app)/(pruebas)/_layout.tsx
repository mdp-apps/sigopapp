import { Stack } from "expo-router";

const PruebaLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="prueba/index"
        options={{
          title: "Calculadora de prueba",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default PruebaLayout;
