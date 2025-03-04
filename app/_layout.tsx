import React,{ useEffect } from "react";

import { useColorScheme, useThemeColor } from "@/presentation/theme/hooks";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-native-reanimated";
import "./global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");

  const [loaded] = useFonts({
    Ruda: require("../assets/fonts/Ruda.ttf"),
    "Ruda-Bold": require("../assets/fonts/Ruda_Bold.ttf"),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <PaperProvider>
        <AlertNotificationRoot>
          <QueryClientProvider client={queryClient}>   
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: backgroundColor,
                  },
                }}
              />
              <StatusBar style="auto" />
            </ThemeProvider>
         </QueryClientProvider>
        </AlertNotificationRoot>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
