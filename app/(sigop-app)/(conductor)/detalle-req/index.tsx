import React from "react";

import { ScrollView, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useProductsReqByCode } from "@/presentation/producto/hooks";

import { ThemedChip, ThemedLoader, ThemedView } from "@/presentation/theme/components";
import {
  PackagingDispatchProducts,
  OtherProducts,
} from "@/presentation/producto/components";

import { Formatter } from "@/config/helpers";
import { REQ_TYPE_FORMAT } from "@/config/constants";

const DetalleReqScreen = () => {
  const primaryColor = useThemeColor({}, "primary");

  const { 
    carrierName,
    customerAbbr,
    reqCode,
    reqType,
    vehiclePatent,
  } = useLocalSearchParams();

  const { queryProductsReq, totalKg, productsPerBatch } = useProductsReqByCode(
    Number(reqCode),
    reqType as string
  );

  return (
    <ThemedView className="py-3 mt-4" margin>
      {queryProductsReq.isLoading ? (
         <ThemedLoader color={primaryColor} size="large"/>
      ) : (
        <ScrollView>
          <View className="mb-4">
            <View className="flex-row justify-between">
              <ThemedChip
                tooltipTitle="Cliente"
                iconSource="account-tie"
                text={customerAbbr as string}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Patente"
                iconSource="car-info"
                text={vehiclePatent as string}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />

              <ThemedChip
                tooltipTitle="Transportista"
                iconSource="truck-delivery"
                text={carrierName as string}
                style={{ backgroundColor: primaryColor }}
                textStyle={{ color: "white" }}
                iconColor="white"
              />
            </View>

            <ThemedChip
              tooltipTitle="Total KG"
              iconSource="plus-box-multiple"
              text={`Total: ${Formatter.numberWithDots(totalKg)} KG.`}
              style={{ backgroundColor: primaryColor }}
              textStyle={{ fontSize: 16, color: "white" }}
              iconColor="white"
            />
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

export default DetalleReqScreen;
