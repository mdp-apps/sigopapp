import React from "react";

import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import { useProductMixesByCode } from "@/presentation/producto/hooks";

import {
  ThemedChip,
  ThemedLoader,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { ReqInfo } from "@/presentation/req/components";
import { PackagingMixes } from "@/presentation/envase/components";
import { View } from "react-native";
import { Formatter } from "@/config/helpers";

const ModificarSacosScreen = () => {
  const grayColor = useThemeColor({}, "gray");
  const primaryColor = useThemeColor({}, "primary");

  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const {
    productMixes,
    isLoadingMixed,
    totalKgProductMixes,
    totalPackagingQuantity,
  } = useProductMixesByCode(reqCode as string, reqType);

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

  return (
    <ThemedView safe>
      <ReqInfo req={queryReqByCode.data!} />

      {isLoadingMixed ? (
        <ThemedLoader color={primaryColor} size="large" />
      ) : (
        <ThemedView margin>
          <View className="flex-row gap-3 mb-3">
            <ThemedChip
              tooltipTitle="Total KG mezclas"
              iconSource="weight-kilogram"
              text={`Total: ${Formatter.numberWithDots(
                totalKgProductMixes
              )} KG`}
              style={{ backgroundColor: primaryColor }}
              textStyle={{ fontSize: 16, color: "white" }}
              iconColor="white"
            />

            <ThemedChip
              tooltipTitle="Cantidad total de sacos"
              iconSource="format-list-numbered"
              text={`Cantidad: ${Formatter.numberWithDots(
                totalPackagingQuantity
              )}`}
              style={{ backgroundColor: primaryColor }}
              textStyle={{ fontSize: 16, color: "white" }}
              iconColor="white"
            />
          </View>

          <PackagingMixes productMixes={productMixes} />
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default ModificarSacosScreen;
