import React from "react";

import { ScrollView, View } from "react-native";
import { Checkbox } from "react-native-paper";

import { useGlobalSearchParams } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";
import { useThemeColor } from "@/presentation/theme/hooks";
import { useCheckboxSelector } from "@/presentation/shared/hooks";
import { useReqByCode, useReqByPatent } from "@/presentation/req/hooks";
import { useProductMixesByCode } from "@/presentation/producto/hooks";
import {
  useConfigurePalletsMutation,
  usePalletizedProductionByCode,
} from "@/presentation/paletizado/hooks";

import {
  ThemedButton,
  ThemedDataTable,
  ThemedHelperText,
  ThemedIconTooltip,
  ThemedInput,
  ThemedLoader,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";

import { palletSchema } from "@/presentation/shared/validations";
import { Palletized, ProductMix } from "@/infrastructure/entities";
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

  const { reqCode, patent } = useGlobalSearchParams();
  const { user } = useAuthStore();

  const { queryReqByCode, reqType } = useReqByCode(reqCode as string);
  const { queryReqByPatent, reqCodeByPatent, reqTypeByPatent } = useReqByPatent(
    patent as string
  );
  const { productMixes, isLoadingMixed } = useProductMixesByCode(
    reqCode ? Number(reqCode) : reqCodeByPatent,
    reqCode ? reqType : reqTypeByPatent
  );
  const { configurePallets } = useConfigurePalletsMutation();
  const {
    queryPalletizedProduction,
    isProductionWithPallet,
    palletQuantity,
    palletTotalWeight,
  } = usePalletizedProductionByCode(
    reqCode ? Number(reqCode) : reqCodeByPatent
  );

  const { isSelectedAll, selectedRows, handleToggleRow, handleToggleAll } =
    useCheckboxSelector<ProductMix>(productMixes);

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
            reqCode: reqCode ? Number(reqCode) : reqCodeByPatent,
            userCode: String(user?.code),

            mixQuantityKG: mix.totalKg,
            batch: mix.batch,
            mixCode: mix.mixCode,

            palletQuantity: Number(values.nroPallets),
            palletTotalWeight: Number(values.totalPalletWeight),
          });
        });

        queryClient.setQueryData<Palletized[]>(
          [
            "palletized-production",
            reqCode ? Number(reqCode) : reqCodeByPatent,
          ],
          (oldData) => {
            if (!oldData) return [];

            const newPalletized: Palletized[] = selectedRows.map((mix) => ({
              hasPallet: true,
              mixQuantityKG: mix.totalKg,
              palletQuantity: Number(values.nroPallets),
              palletTotalWeight: Number(values.totalPalletWeight),
              reqCode: reqCode ? Number(reqCode) : reqCodeByPatent,
            }));

            return [...oldData, ...newPalletized];
          }
        );
      },
    });
  };

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
    <ThemedView margin safe keyboardAvoiding>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="border-b border-t border-gray-300 py-5 mb-6">
          <ThemedText
            variant="h3"
            className="uppercase font-semibold text-slate-800 text-center"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {queryReqByCode.data?.driverName ??
              queryReqByPatent.data?.driverName}{" "}
            -{" "}
            {queryReqByCode.data?.vehiclePatent ??
              queryReqByPatent.data?.vehiclePatent}
          </ThemedText>
          <ThemedText
            variant="h4"
            className="font-semibold text-slate-800 text-center"
            adjustsFontSizeToFit
          >
            {queryReqByCode.data?.date ?? queryReqByPatent.data?.date} - T
            {queryReqByCode.data?.turn ?? queryReqByPatent.data?.turn} -{" "}
            {queryReqByCode.data?.nameReqFormat ??
              queryReqByPatent.data?.nameReqFormat}
          </ThemedText>
        </View>

        {isProductionWithPallet && (
          <ThemedText
            variant="h2"
            className="font-semibold text-zinc-950 text-center mb-4"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Producción Paletizada
          </ThemedText>
        )}

        <ThemedDataTable<ProductMix>
          data={productMixes}
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

        {isProductionWithPallet ? (
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
                {palletTotalWeight} KG
              </ThemedText>
            </View>
          </ThemedView>
        ) : (
          <ThemedView className="items-center gap-4" margin>
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
              isLoading={configurePallets.isPending}
            >
              <ThemedText
                variant="h4"
                className="text-white uppercase w-full text-center font-semibold tracking-widest"
              >
                Guardar
              </ThemedText>
            </ThemedButton>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
