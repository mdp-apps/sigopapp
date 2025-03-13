import React, { useEffect } from "react";

import { router, Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useAuthStore } from "@/presentation/auth/store";
import { PermissionsCheckerProvider } from "@/presentation/shared/providers";

import { ThemedLoader } from "@/presentation/theme/components";

const CheckAuthenticationLayout = () => {
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
  const { reqCode } = useGlobalSearchParams();

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
            headerShown: false,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: backgroundColor },
            headerTitleStyle: {
              fontFamily: "Ruda",
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="(home)/index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(home)/detalle-req/index"
            options={{
              headerShown: true,
              headerTitle: "Detalle de Requerimiento",
            }}
          />

          <Stack.Screen
            name="(home)/ver-detalle-req/index"
            options={{
              headerShown: true,
              headerTitle: reqCode
                ? `Detalle de Req. ${reqCode}`
                : "Detalle de Requerimiento",
            }}
          />
        </Stack>
      </PermissionsCheckerProvider>
    );
  }

  return null;
};

export default CheckAuthenticationLayout;
