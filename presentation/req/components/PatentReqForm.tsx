import React from "react";
import { Keyboard } from "react-native";
import { router, Href } from "expo-router";

import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedView,
} from "@/presentation/theme/components";

import { searchPatentReqSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface PatentReqFormProps {
  screenLink: Href;
}

export const PatentReqForm = ({ screenLink }: PatentReqFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof searchPatentReqSchema>>({
    resolver: zodResolver(searchPatentReqSchema),
    defaultValues: {
      patent: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchPatentReqSchema>) => {
      Keyboard.dismiss();
  
      router.navigate(screenLink);
      router.setParams({ patent: values.patent });
    };

  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <Controller
        control={control}
        name="patent"
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedInput
            className="text-black px-4 py-2 border border-light-primary font-ruda rounded-full bg-white"
            style={{ height: 50 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ingrese patente"
            isNative
          />
        )}
      />
      {errors.patent && (
        <ThemedHelperText isVisible={Boolean(errors.patent)}>
          {errors.patent?.message}
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
