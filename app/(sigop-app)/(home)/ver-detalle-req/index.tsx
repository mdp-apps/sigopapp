import React from "react";

import { ScrollView, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode, useReqByPatent } from "@/presentation/req/hooks";
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

  const { reqCode, patent } = useLocalSearchParams();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { queryReqByPatent, reqTypeByPatent, reqCodeByPatent } = useReqByPatent(
    patent as string
  );
  const { queryProductsReq, totalKg, productsPerBatch } = useProductsReqByCode(
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
                tooltipTitle="Código"
                iconSource="alpha-r-circle"
                text={reqCode ? (reqCode as string) : reqCodeByPatent}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Cliente"
                iconSource="account-tie"
                text={
                  reqCode
                    ? queryReqByCode.data?.customerAbbr!
                    : queryReqByPatent.data?.customerAbbr!
                }
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Patente"
                iconSource="car-info"
                text={
                  reqCode
                    ? queryReqByCode.data?.vehiclePatent!
                    : queryReqByPatent.data?.vehiclePatent!
                }
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />
            </View>

            <View className="flex-row gap-3">
              <ThemedChip
                tooltipTitle="Transportista"
                iconSource="truck-delivery"
                text={
                  reqCode
                    ? queryReqByCode.data?.carrierName!
                    : queryReqByPatent.data?.carrierName!
                }
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              {Object.keys(productsPerBatch).length !== 0 && (
                <ThemedChip
                  tooltipTitle="Total KG"
                  iconSource="plus-box-multiple"
                  text={`Total: ${Formatter.numberWithDots(totalKg)} KG`}
                  style={{ backgroundColor: primaryColor }}
                  textStyle={{ fontSize: 16, color: "white" }}
                  iconColor="white"
                />
              )}
            </View>
          </View>

          {reqType === REQ_TYPE_FORMAT.despachoEnvasado ||
          reqTypeByPatent === REQ_TYPE_FORMAT.despachoEnvasado ? (
            <PackagingDispatchProducts
              productsPerBatch={productsPerBatch ?? []}
            />
          ) : (
            <OtherProducts products={queryProductsReq.data! ?? []} />
          )}
        </ScrollView>
      )}
    </ThemedView>
  );
};

export default VerDetalleReqScreen;
