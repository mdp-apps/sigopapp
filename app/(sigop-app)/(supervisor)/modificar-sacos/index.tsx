import React from "react";

import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode, useReqByPatent } from "@/presentation/req/hooks";
import { useProductMixesByCode } from "@/presentation/producto/hooks";

import {
  ThemedChip,
  ThemedLoader,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import { ReqInfo } from "@/presentation/req/components";
import { PackagingMixes } from "@/presentation/envase/components";
import { ScrollView, View } from "react-native";
import { Formatter } from "@/config/helpers";

const ModificarSacosScreen = () => {
  const grayColor = useThemeColor({}, "gray");
  const primaryColor = useThemeColor({}, "primary");

  const { reqCode, patent } = useGlobalSearchParams();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { queryReqByPatent, reqCodeByPatent, reqTypeByPatent } = useReqByPatent(
    patent as string
  );
  const {
    productMixes,
    isLoadingMixed,
    totalKgProductMixes,
    totalPackagingQuantity,
  } = useProductMixesByCode(
    reqCode ? Number(reqCode) : reqCodeByPatent,
    reqCode ? reqType : reqTypeByPatent
  );

  if (queryReqByCode.isLoading || queryReqByPatent.isLoading) {
    return <ThemedLoader color={grayColor} size="large" />;
  }

  if (queryReqByCode.isError || queryReqByPatent.isError) {
    return (
      <ThemedView safe className="items-center justify-center">
        <NoDataCard
          message={
            queryReqByCode.error?.message! || queryReqByPatent.error?.message!
          }
          iconSource="alert-circle"
          iconColor="red"
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView margin>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ReqInfo
          req={reqCode ? queryReqByCode.data! : queryReqByPatent.data!}
        />

        {isLoadingMixed ? (
          <ThemedLoader color={primaryColor} size="large" />
        ) : (
          <ThemedView className="mb-4">
            <View className="flex-row gap-3 mb-3">
              <ThemedChip
                tooltipTitle="Total KG mezclas"
                iconSource="weight-kilogram"
                text={`Total: ${Formatter.numberWithDots(
                  totalKgProductMixes
                )} KG`}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ fontSize: 15, color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Cantidad total de sacos"
                iconSource="format-list-numbered"
                text={`Cantidad: ${Formatter.numberWithDots(
                  totalPackagingQuantity
                )}`}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ fontSize: 15, color: "white" }}
                iconColor="white"
              />
            </View>

            <PackagingMixes
              productMixes={productMixes}
              reqType={reqCode ? reqType : reqTypeByPatent}
            />
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default ModificarSacosScreen;
