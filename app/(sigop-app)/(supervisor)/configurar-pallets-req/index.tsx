import { View } from "react-native";

import { useGlobalSearchParams } from "expo-router";

import { useReqByCode } from "@/presentation/req/hooks";

import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { PalletizedMixingTable } from "@/presentation/paletizado/components";

import { palletSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ConfigurarPalletsScreen = () => {
  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);

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
    console.log(values);
  };

  return (
    <ThemedView className="mx-2" safe>
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

      <PalletizedMixingTable />

      <ThemedView margin className="flex-1 items-center gap-4 mt-10">
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
        >
          <ThemedText
            variant="h4"
            className="text-white uppercase w-full text-center font-semibold tracking-widest"
          >
            Guardar
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
