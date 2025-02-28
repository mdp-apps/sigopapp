import { useEffect } from "react";

import { router, Stack } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useAuthStore } from "@/presentation/auth/store";
import { PermissionsCheckerProvider } from "@/presentation/shared/providers";

import { GlobalLoader } from "@/presentation/shared/components";

const CheckAuthenticationLayout = () => {
  const backgroundColor = useThemeColor({}, "background");

  const { status, checkStatus } = useAuthStore();
  // console.log(JSON.stringify({ status, user, profile }, null, 2));

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/(profiles)");
    }
  }, [status]);


  if (status === "checking") {
    return <GlobalLoader />;
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
