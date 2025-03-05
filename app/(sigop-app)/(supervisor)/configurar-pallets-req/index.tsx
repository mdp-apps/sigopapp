import React from "react";

import { View } from "react-native";
import { ActivityIndicator, Checkbox } from "react-native-paper";

import { useGlobalSearchParams } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";
import { useCheckboxSelector } from "@/presentation/shared/hooks";
import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import {
  useConfigurePalletsMutation,
  usePalletizedProductionByCode,
  usePalletizingMixesByCode,
} from "@/presentation/paletizado/hooks";

import {
  ThemedButton,
  ThemedDataTable,
  ThemedHelperText,
  ThemedInput,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";

import { palletSchema } from "@/presentation/shared/validations";
import { PalletizingMix } from "@/infrastructure/entities";
import { MIXES_REQ_COLUMNS } from "@/config/constants";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ConfigurarPalletsScreen = () => {
  const primaryColor = useThemeColor({}, "primary");
  const grayColor = useThemeColor({}, "gray");
  const grayDarkColor = useThemeColor({}, "darkGray");
  const textColor = useThemeColor({}, "text");

  const { reqCode } = useGlobalSearchParams();
  const { user } = useAuthStore();

  
  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { palletizingMixes,isLoadingMixed } = usePalletizingMixesByCode(
    Number(reqCode),
    reqType
  );
  const { configurePallets } = useConfigurePalletsMutation();
  const { queryPalletizedProduction } = usePalletizedProductionByCode(
    Number(reqCode)
  );
  const {
    isSelectedAll,
    selectedRows,
    handleToggleRow,
    handleToggleAll
  } = useCheckboxSelector<PalletizingMix>(palletizingMixes);
  console.log(JSON.stringify({ req: queryReqByCode.data }, null, 2));
  // console.log(JSON.stringify(queryPalletizedProduction.data, null, 2));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof palletSchema>>({
    resolver: zodResolver(palletSchema),
    defaultValues: {
      nroPallets: "",
      totalPalletWeight: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof palletSchema>) => {
    selectedRows.forEach((mix) => {
      configurePallets.mutate({
        reqCode: Number(reqCode),
        userCode: String(user?.code),

        mixQuantityKG: mix.totalKg,
        batch: mix.batch,
        mixCode: mix.mixCode,

        palletQuantity: Number(values.nroPallets),
        palletTotalWeight: Number(values.totalPalletWeight),
      });
    });

    reset();


  };

  return (
    <ThemedView className="mx-2" safe keyboardAvoiding>
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

      <ThemedDataTable<PalletizingMix>
        data={palletizingMixes}
        columns={MIXES_REQ_COLUMNS}
        getRowKey={(item) => item.id}
        headerStyle={{
          borderBottomColor: grayColor,
          marginBottom: 10,
        }}
        isLoading={isLoadingMixed}
        columnCellStyle={{
          fontWeight: "700",
          color: grayDarkColor,
          textTransform: "uppercase",
        }}
        rowStyle={{ borderBottomColor: grayColor }}
        cellStyle={{ fontWeight: "400", color: textColor }}
        renderColAction={() => (
          <Checkbox
            status={isSelectedAll ? "checked" : "unchecked"}
            onPress={() => handleToggleAll(!isSelectedAll)}
            color={primaryColor}
          />
        )}
        renderActions={(row) => (
          <Checkbox
            status={selectedRows.includes(row) ? "checked" : "unchecked"}
            onPress={() => handleToggleRow(row.id)}
            color={primaryColor}
          />
        )}
      />

      <ThemedView className="flex-1 items-center gap-4 mt-10" margin>
        <Controller
          control={control}
          name="nroPallets"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className="text-black px-4 py-2 border border-orange-400 rounded-3xl bg-white"
              style={{ height: 55 }}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Ingrese N° Pallet"
              keyboardType="number-pad"
              returnKeyType="next"
              value={String(value)}
              isNative
            />
          )}
        />
        {errors.nroPallets && (
          <ThemedHelperText isVisible={Boolean(errors.nroPallets)}>
            {errors.nroPallets?.message}
          </ThemedHelperText>
        )}

        <Controller
          control={control}
          name="totalPalletWeight"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className="text-black px-4 py-3 border border-orange-400 rounded-3xl bg-white"
              style={{ height: 55 }}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Ingrese peso total de Pallet"
              keyboardType="number-pad"
              returnKeyType="next"
              value={String(value)}
              isNative
            />
          )}
        />
        {errors.nroPallets && (
          <ThemedHelperText isVisible={Boolean(errors.nroPallets)}>
            {errors.nroPallets?.message}
          </ThemedHelperText>
        )}

        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          className="bg-orange-400 w-4/6 mt-2 rounded-lg"
          disabled={selectedRows.length <= 0}
        >
          {configurePallets.isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <ThemedText
              variant="h4"
              className="text-white uppercase w-full text-center font-semibold tracking-widest"
            >
              Guardar
            </ThemedText>
          )}
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
