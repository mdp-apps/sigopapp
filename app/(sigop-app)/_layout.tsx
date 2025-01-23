import { useEffect } from "react";

import { Redirect, Stack } from "expo-router";

import { GlobalLoader } from "@/presentation/shared/components";
import { useAuthStore } from "@/presentation/auth/store";
import { Colors } from "@/config/constants";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus, user,profile } = useAuthStore();
  console.log(JSON.stringify({ status, user, profile }, null, 2));

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return <GlobalLoader />;
  }

  if (status === "unauthenticated") {
    return <Redirect href="/auth/(login-rut)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        contentStyle: { backgroundColor: Colors.light.background },
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
