import { useEffect } from "react";

import { useThemeColor } from "@/presentation/theme/hooks";

import { Redirect, Stack } from "expo-router";

import { GlobalLoader } from "@/presentation/shared/components";
import { useAuthStore } from "@/presentation/auth/store";

const CheckAuthenticationLayout = () => {
  const backgroundColor = useThemeColor({}, "background");

  const { status, checkStatus, user, profile } = useAuthStore();
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
        contentStyle: { backgroundColor: backgroundColor },
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
