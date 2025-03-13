import React from "react";
import { View } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { useThemeColor } from "@/presentation/theme/hooks";
import { useVisibility } from "@/presentation/shared/hooks";
import { useUpdatePackagingMutation } from "@/presentation/envase/hooks";

import {
  ThemedButton,
  ThemedInput,
  ThemedModal,
  ThemedText,
} from "@/presentation/theme/components";
import { ProductMix } from "@/infrastructure/entities";

import { packagingSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PackagingMixCardProps {
  productMix: ProductMix;
}

export const PackagingMixCard = ({ productMix }: PackagingMixCardProps) => {
  const primaryColor = useThemeColor({}, "primary");

  const { reqCode } = useGlobalSearchParams();

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const { updatePackaging } = useUpdatePackagingMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof packagingSchema>>({
    resolver: zodResolver(packagingSchema),
    defaultValues: {
      packagingQuantity: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof packagingSchema>) => {
    console.log({ values });

    updatePackaging.mutate({
      reqCode: Number(reqCode),
      codeDetailReq: 0,
      mixCode: "",
      batch: 0,
      codeProduct: "",
      quantity: values.packagingQuantity,
    });
  };

  return (
    <>
      <View className="relative flex-1 flex-col gap-5 px-4 py-6">
        <ThemedButton
          className="absolute top-3 right-3 z-50 !p-0"
          variant="icon"
          iconName="pencil"
          iconSize={28}
          iconColor={primaryColor}
          onPress={showModal}
        />

        <View className="items-center gap-1">
          <ThemedText
            variant="h3"
            className="text-gray-600 uppercase w-full text-center font-bold"
          >
            Envase
          </ThemedText>
          <ThemedText variant="h4" className="text-slate-900">
            {productMix.packagingName}
          </ThemedText>
        </View>

        <View className="flex-1 flex-row justify-between items-center gap-1">
          <View>
            <ThemedText variant="h5" className="font-semibold">
              Código mezcla
            </ThemedText>

            <ThemedText variant="h4" className="text-slate-900 text-center">
              {productMix.mixCode}
            </ThemedText>
          </View>
          <View>
            <ThemedText variant="h5" className=" font-semibold">
              Producto KG
            </ThemedText>

            <ThemedText variant="h4" className="text-slate-900 text-center">
              {productMix.totalKg}
            </ThemedText>
          </View>
          <View>
            <ThemedText variant="h5" className=" font-semibold">
              Cantidad
            </ThemedText>

            <ThemedText variant="h4" className="text-slate-900 text-center">
              {productMix.totalPackagingQuantity}
            </ThemedText>
          </View>
        </View>
      </View>

      <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
        <ThemedText
          variant="h4"
          className="uppercase font-semibold !text-slate-900 mb-6"
          adjustsFontSizeToFit
        >
          Editar cantidad de sacos
        </ThemedText>

        <Controller
          control={control}
          name="packagingQuantity"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className="text-black px-4 py-2 border border-orange-400 rounded-3xl bg-white"
              style={{ height: 50 }}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Ingrese N° de sacos"
              keyboardType="number-pad"
              returnKeyType="next"
              value={String(value)}
              isNative
            />
          )}
        />

        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          className="bg-orange-400  mt-5 rounded-lg"
          isLoading={updatePackaging.isPending}
          disabled={updatePackaging.isPending}
        >
          <ThemedText
            variant="h6"
            className="text-white uppercase w-full text-center font-semibold tracking-widest"
          >
            Guardar
          </ThemedText>
        </ThemedButton>
      </ThemedModal>
    </>
  );
};
