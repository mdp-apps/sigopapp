import { View } from "react-native";

import { useGlobalSearchParams } from "expo-router";

import { useReqByCode } from "@/presentation/req/hooks";

import { ThemedText, ThemedView } from "@/presentation/theme/components";

const ConfigurarPalletsScreen = () => {
  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);

  return (
    <ThemedView safe>
      <View className="border-b border-t border-slate-400 py-5">
        <ThemedText
          variant="h3"
          className="uppercase font-semibold text-slate-800 text-center"
          adjustsFontSizeToFit
        >
          {queryReqByCode.data?.driverName} -{" "}
          {queryReqByCode.data?.vehiclePatent}
        </ThemedText>
        <ThemedText
          variant="h4"
          className="font-semibold text-slate-800 text-center"
          adjustsFontSizeToFit
        >
          {queryReqByCode.data?.date} (T{queryReqByCode.data?.turn}){" "}
          {queryReqByCode.data?.nameReqFormat}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
