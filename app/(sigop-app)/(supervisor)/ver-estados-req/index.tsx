import React from "react";
import { View } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode, useLogStatusReq } from "@/presentation/req/hooks";

import {
  ThemedLoader,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";

const VerEstadosReqScreen = () => {
  const grayColor = useThemeColor({}, "gray");
  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);
  const { queryLogStatusReq } = useLogStatusReq(reqCode as string);

  console.log(
    JSON.stringify(
      { req: queryReqByCode.data, logStatusReq: queryLogStatusReq.data },
      null,
      2
    )
  );

  if (queryReqByCode.isLoading) {
    return <ThemedLoader color={grayColor} size="large" />;
  }

  if (queryReqByCode.isError) {
    return (
      <ThemedView safe className="items-center justify-center">
        <NoDataCard
          message={`No existe el requerimiento ${reqCode}`}
          iconSource="alert-circle"
          iconColor="red"
        />
      </ThemedView>
    );
  }

  if (queryReqByCode.isSuccess && !queryReqByCode.data) {
    return (
      <ThemedView safe className="items-center justify-center">
        <NoDataCard
          message={`No existe el requerimiento ${reqCode}`}
          iconSource="alert-circle"
          iconColor={grayColor}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView margin safe>
      <View className="gap-2 py-5 mb-6">
        <View className="border-b border-gray-300 p-2">
          <ThemedText
            variant="h4"
            className="uppercase font-semibold !text-slate-900 text-center"
            adjustsFontSizeToFit
          >
            {queryReqByCode.data?.nameReqFormat} de{" "}
            {queryReqByCode.data?.customerAbbr}
          </ThemedText>
          <ThemedText
            variant="h4"
            className="uppercase font-semibold !text-slate-900 text-center"
            adjustsFontSizeToFit
          >
            {queryReqByCode.data?.date} - T{queryReqByCode.data?.turn}
          </ThemedText>
        </View>

        <View className="border-b border-gray-300 py-2">
          <ThemedText
            variant="semi-bold"
            className="uppercase !text-slate-700 text-xl"
            adjustsFontSizeToFit
          >
            Chofer:
          </ThemedText>
          <ThemedText
            variant="h4"
            className="!text-slate-800"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {queryReqByCode.data?.driverName} | {queryReqByCode.data?.rutDriver}{" "}
            | {queryReqByCode.data?.vehiclePatent}
          </ThemedText>
        </View>

        <View className="flex-row gap-6 py-2">
          <ThemedText
            variant="semi-bold"
            className="uppercase !text-slate-700 text-xl"
            adjustsFontSizeToFit
          >
            Bodega:{" "}
            <ThemedText className="font-normal">
              B-{queryReqByCode.data?.warehouseCode}
            </ThemedText>
          </ThemedText>
          <ThemedText
            variant="semi-bold"
            className="uppercase !text-slate-700 text-xl"
            adjustsFontSizeToFit
          >
            Planta:{" "}
            <ThemedText className="font-normal">
              P{queryReqByCode.data?.plantCode}
            </ThemedText>
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export default VerEstadosReqScreen;
