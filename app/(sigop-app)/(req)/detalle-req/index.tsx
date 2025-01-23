import { ScrollView, View } from "react-native";

import { ActivityIndicator } from "react-native-paper";

import { useLocalSearchParams } from "expo-router";

import { useProductsReqByCode } from "@/presentation/producto/hooks";
import { ThemedChip, ThemedView } from "@/presentation/theme/components";
import {
  PackagingDispatchProducts,
  OtherProducts,
} from "@/presentation/producto/components";

import { Formatter } from "@/config/helpers";
import { REQ_TYPE_FORMAT } from "@/config/constants";

const DetalleReqScreen = () => {
  const { carrierName, customerAbbr, reqCode, reqType, vehiclePatent } =
    useLocalSearchParams();

  const { productsReq, isLoadingProductsReq, totalKg, productsPerBatch } =
    useProductsReqByCode(reqCode as string, reqType as string);

  return (
    <ThemedView className="pt-3" margin>
      {isLoadingProductsReq ? (
        <ActivityIndicator size="large" className="bg-blue-800" />
      ) : (
        <View>
          <View className="flex-row">
            <ThemedChip
              tooltipTitle="Cliente"
              iconSource="account-tie"
              text={customerAbbr as string}
            />

            <ThemedChip
              tooltipTitle="Patente"
              iconSource="car-info"
              text={vehiclePatent as string}
              style={{ marginLeft: 10 }}
              textStyle={{ fontSize: 16 }}
            />
          </View>

          <ThemedChip
            tooltipTitle="Transportista"
            iconSource="truck-delivery"
            text={carrierName as string}
            textStyle={{ fontSize: 16 }}
          />

          <ThemedChip
            tooltipTitle="Total KG"
            iconSource="plus-box-multiple"
            text={`Total: ${Formatter.numberWithDots(totalKg)} KG.`}
            textStyle={{ fontSize: 16 }}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            {Number(reqType) === REQ_TYPE_FORMAT.despachoEnvasado ? (
              <PackagingDispatchProducts productsPerBatch={productsPerBatch} />
            ) : (
              <OtherProducts products={productsReq} />
            )}
          </ScrollView>
        </View>
      )}
    </ThemedView>
  );
};

export default DetalleReqScreen;
