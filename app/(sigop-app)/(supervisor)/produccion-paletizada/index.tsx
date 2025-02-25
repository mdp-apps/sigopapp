import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedView,
} from "@/presentation/theme/components";
import { palletizingProductionReqSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";

const ProduccionPalizadaScreen = () => {
  const {
    control,
    formState: { errors},
    handleSubmit,
  } = useForm<z.infer<typeof palletizingProductionReqSchema>>({
    resolver: zodResolver(palletizingProductionReqSchema),
    defaultValues: {
      reqCode: "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof palletizingProductionReqSchema>
  ) => {

    router.navigate("/(sigop-app)/(supervisor)/configurar-pallets-req");
    router.setParams({ reqCode: values.reqCode });
  };

  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <Controller
        control={control}
        name="reqCode"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            className="text-black px-4 py-2 border border-light-primary font-ruda rounded-full bg-white"
            style={{ height: 50 }}
            keyboardType="number-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese requerimiento"
            isNative
          />
        )}
      />
      {errors.reqCode && (
        <ThemedHelperText isVisible={Boolean(errors.reqCode)}>
          {errors.reqCode?.message}
        </ThemedHelperText>
      )}

      <ThemedButton
        variant="rounded"
        onPress={handleSubmit(onSubmit)}
        text="INGRESAR"
        className="bg-light-primary w-5/6"
      />
    </ThemedView>
  );
};

export default ProduccionPalizadaScreen;
