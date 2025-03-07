import React,{ useEffect } from "react";

import { router, Stack } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useAuthStore } from "@/presentation/auth/store";
import { PermissionsCheckerProvider } from "@/presentation/shared/providers";

import { ThemedLoader } from "@/presentation/theme/components";

const CheckAuthenticationLayout = () => {
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");

  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/(profiles)");
    }
  }, [status]);


  if (status === "checking") {
    return <ThemedLoader color={primaryColor} size="large" />;
  }
  
  if (status === "authenticated") {
    return (
      <PermissionsCheckerProvider>
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
      </PermissionsCheckerProvider>
    );
  }


  return null;
};

export default CheckAuthenticationLayout;
