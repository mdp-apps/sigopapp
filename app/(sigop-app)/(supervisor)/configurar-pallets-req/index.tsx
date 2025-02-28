import { View } from "react-native";

import { useGlobalSearchParams } from "expo-router";

import { useReqByCode } from "@/presentation/req/hooks";

import { ThemedText, ThemedView } from "@/presentation/theme/components";
import { PalletizedMixingTable } from "@/presentation/paletizado/components";

const ConfigurarPalletsScreen = () => {

  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);

  return (
    <ThemedView className="mx-2" safe>
      <View className="border-b border-t border-gray-300 py-5 mb-6">
        <ThemedText
          variant="h3"
          className="uppercase font-semibold text-slate-800 text-center"
          numberOfLines={1}
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

      <PalletizedMixingTable />
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
