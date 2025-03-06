import React from 'react'
import { Keyboard } from "react-native";
import { Href, router } from "expo-router";

import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedView,
} from "@/presentation/theme/components";
import { searchReqSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface SearchReqProps {
  screenLink: Href;
}

export const SearchReq = ({screenLink}: SearchReqProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof searchReqSchema>>({
    resolver: zodResolver(searchReqSchema),
    defaultValues: {
      reqCode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchReqSchema>) => {
    Keyboard.dismiss();

    router.navigate(screenLink);
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
