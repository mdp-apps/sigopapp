import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login-sigop/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login-conductor/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="biometria/index"
        options={{
          title: "Biometría",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
