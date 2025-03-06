import React from "react";

import { View } from "react-native";
import { ActivityIndicator, Checkbox, Icon } from "react-native-paper";

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
  ThemedIconTooltip,
  ThemedInput,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";

import { palletSchema } from "@/presentation/shared/validations";
import { Palletized, PalletizingMix } from "@/infrastructure/entities";
import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import { MIXES_REQ_COLUMNS } from "@/config/constants";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

const ConfigurarPalletsScreen = () => {
  const primaryColor = useThemeColor({}, "primary");
  const grayColor = useThemeColor({}, "gray");
  const grayDarkColor = useThemeColor({}, "darkGray");
  const textColor = useThemeColor({}, "text");

  const queryClient = useQueryClient();

  const { reqCode } = useGlobalSearchParams();
  const { user } = useAuthStore();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { palletizingMixes, isLoadingMixed } = usePalletizingMixesByCode(
    Number(reqCode),
    String(reqType)
  );
  const { configurePallets } = useConfigurePalletsMutation();
  const {
    queryPalletizedProduction,
    isProductionWithPallet,
    palletQuantity,
    palletTotalWeight,
  } = usePalletizedProductionByCode(Number(reqCode));

  const { isSelectedAll, selectedRows, handleToggleRow, handleToggleAll } =
    useCheckboxSelector<PalletizingMix>(palletizingMixes);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof palletSchema>>({
    resolver: zodResolver(palletSchema),
    defaultValues: {
      nroPallets: "",
      totalPalletWeight: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof palletSchema>) => {
    AlertNotifyAdapter.show({
      type: AlertType.WARNING,
      title: "Configuración de pallets",
      textBody: "¿Confirma que los datos ingresados son los correctos?",
      button: "Aceptar",
      onPressButton: () => {
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

        queryClient.setQueryData<Palletized[]>(
          ["palletized-production", Number(reqCode)],
          (oldData) => {
            if (!oldData) return [];

            const newPalletized: Palletized[] = selectedRows.map((mix) => ({
              hasPallet: true,
              mixQuantityKG: mix.totalKg,
              palletQuantity: Number(values.nroPallets),
              palletTotalWeight: Number(values.totalPalletWeight),
              reqCode: Number(reqCode),
            }));

            return [...oldData, ...newPalletized];
          }
        );
      },
    });
  };

  if (queryReqByCode.isLoading) {
    return (
      <ThemedView safe className="items-center justify-center">
        <ActivityIndicator size="large" color={grayColor} />
      </ThemedView>
    );
  }

  if (queryReqByCode.isError) {
    return (
      <ThemedView safe className="items-center justify-center">
        <NoDataCard
          message={`No existe el requerimiento ${reqCode}`}
          iconSource="alert-circle"
          iconColor={"red"}
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
    <ThemedView className="mx-2" safe keyboardAvoiding>
      {queryReqByCode.data && (
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
            {queryReqByCode.data?.date} - T{queryReqByCode.data?.turn} -{" "}
            {queryReqByCode.data?.nameReqFormat}
          </ThemedText>
        </View>
      )}

      {queryReqByCode.data && isProductionWithPallet && (
        <ThemedText
          variant="h2"
          className="font-semibold text-zinc-950 text-center mb-4"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Producción Paletizada
        </ThemedText>
      )}

      {queryReqByCode.data && (
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
          renderColAction={() =>
            isProductionWithPallet ? (
              <ThemedIconTooltip
                tooltipTitle="Pallets"
                iconStyles={{
                  name: "shipping-pallet",
                  color: grayDarkColor,
                  size: 30,
                }}
              />
            ) : (
              <Checkbox
                status={isSelectedAll ? "checked" : "unchecked"}
                onPress={() => handleToggleAll(!isSelectedAll)}
                color={primaryColor}
              />
            )
          }
          renderActions={(row) => {
            const isMixPalletized = queryPalletizedProduction.data?.some(
              (p) => p.mixQuantityKG === row.totalKg
            );

            return (
              <Checkbox
                status={
                  isProductionWithPallet
                    ? isMixPalletized
                      ? "checked"
                      : "unchecked"
                    : selectedRows.includes(row)
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => handleToggleRow(row.id)}
                color={primaryColor}
                disabled={isProductionWithPallet}
              />
            );
          }}
        />
      )}

      {queryReqByCode.data && isProductionWithPallet ? (
        <ThemedView
          className="flex-1 flex-row justify-evenly items-center"
          margin
        >
          <View>
            <ThemedText
              variant="h3"
              className="uppercase font-semibold text-slate-900 text-center"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              N° Pallets
            </ThemedText>
            <ThemedText
              variant="h2"
              className="text-slate-800 text-center"
              adjustsFontSizeToFit
            >
              {palletQuantity}
            </ThemedText>
          </View>

          <View>
            <ThemedText
              variant="h3"
              className="uppercase font-semibold text-slate-900 text-center"
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              Peso Total
            </ThemedText>
            <ThemedText
              variant="h2"
              className="text-slate-800 text-center"
              adjustsFontSizeToFit
            >
              {palletTotalWeight}
            </ThemedText>
          </View>
        </ThemedView>
      ) : (
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
      )}
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
