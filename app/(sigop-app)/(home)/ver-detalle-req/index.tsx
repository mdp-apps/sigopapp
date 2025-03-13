import React from "react";

import { ScrollView, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import { useProductsReqByCode } from "@/presentation/producto/hooks";

import {
  ThemedChip,
  ThemedLoader,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import {
  PackagingDispatchProducts,
  OtherProducts,
} from "@/presentation/producto/components";

import { Formatter } from "@/config/helpers";
import { REQ_TYPE_FORMAT } from "@/config/constants";

const VerDetalleReqScreen = () => {
  const primaryColor = useThemeColor({}, "primary");
  const grayColor = useThemeColor({}, "gray");

  const { reqCode } = useLocalSearchParams();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { queryProductsReq, totalKg, productsPerBatch } = useProductsReqByCode(
    Number(reqCode),
    String(reqType)
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


  return (
    <ThemedView className="py-3 mt-4" margin>
      {queryProductsReq.isLoading ? (
        <ThemedLoader color={primaryColor} size="large" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <View className="flex-row gap-3">
              <ThemedChip
                tooltipTitle="Cliente"
                iconSource="account-tie"
                text={queryReqByCode.data?.customerAbbr!}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Patente"
                iconSource="car-info"
                text={queryReqByCode.data?.vehiclePatent!}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Transportista"
                iconSource="truck-delivery"
                text={queryReqByCode.data?.carrierName!}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />
            </View>

            {Object.keys(productsPerBatch).length !== 0 && (
              <ThemedChip
                tooltipTitle="Total KG"
                iconSource="plus-box-multiple"
                text={`Total: ${Formatter.numberWithDots(totalKg)} KG.`}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ fontSize: 16, color: "white" }}
                iconColor="white"
              />
            )}
          </View>

          {Number(reqType) === REQ_TYPE_FORMAT.despachoEnvasado ? (
            <PackagingDispatchProducts productsPerBatch={productsPerBatch} />
          ) : (
            <OtherProducts products={queryProductsReq.data!} />
          )}
        </ScrollView>
      )}
    </ThemedView>
  );
};

export default VerDetalleReqScreen;
