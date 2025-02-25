import { Stack, useLocalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";

const ReqLayout = () => {
  const { reqCode } = useLocalSearchParams();

  const primaryColor = useThemeColor({}, "primary");
  const backgroundColor = useThemeColor({}, "background");


  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: backgroundColor },
      }}
    >
      <Stack.Screen
        name="req-patente/index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="log-estados/index"
        options={{
          headerTitle: reqCode
            ? `Trazabilidad de Req. ${reqCode}`
            : "Trazabilidad",
          headerShown: true,
          headerTintColor: backgroundColor,
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTitleStyle: {
            fontFamily: "Ruda",
          },
        }}
      />

      <Stack.Screen
        name="detalle-req/index"
        options={{
          headerShown: true,
          headerTitle: reqCode
            ? `Detalle de Req. ${reqCode}`
            : "Detalle de Requerimiento",
          headerTitleStyle: {
            fontFamily: "Ruda",
          },
        }}
      />
    </Stack>
  );
};

export default ReqLayout;
