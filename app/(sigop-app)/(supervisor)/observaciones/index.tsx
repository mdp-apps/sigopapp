import React from "react";
import { useGlobalSearchParams } from "expo-router";

import { useAuthStore } from "@/presentation/auth/store";
import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import {
  useObservationMutation,
  useReqObservations,
} from "@/presentation/observacion/hooks";

import { NoDataCard } from "@/presentation/shared/components";
import {
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedLoader,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { ReqInfo } from "@/presentation/req/components";
import { observationSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ObservacionesScreen = () => {
  const grayColor = useThemeColor({}, "gray");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof observationSchema>>({
    resolver: zodResolver(observationSchema),
    defaultValues: {
      observation: "",
    },
  });

  const { reqCode } = useGlobalSearchParams();

  const { queryReqByCode } = useReqByCode(reqCode as string);
  const { queryObservations } = useReqObservations(reqCode as string);
  const { createObservation } = useObservationMutation();

  console.log(
    JSON.stringify(
      {
        observations: queryObservations.data,
        createObservation: createObservation.data,
      },
      null,
      2
    )
  );

  const { user } = useAuthStore();

  const onSubmit = async (values: z.infer<typeof observationSchema>) => {
    createObservation.mutate({
      reqCode: reqCode as string,
      commment: values.observation,
      userCode: user?.code ?? 0,
    });
  };

  if (queryReqByCode.isLoading) {
    return <ThemedLoader color={grayColor} size="large" />;
  }

  if (queryReqByCode.isError) {
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
    <ThemedView safe>
      <ReqInfo req={queryReqByCode.data!} />

      <ThemedView className="flex-1 items-center gap-4" margin>
        <Controller
          control={control}
          name="observation"
          render={({ field: { onChange, value } }) => (
            <ThemedInput
              style={{ height: 100, borderRadius: 20 }}
              className="text-black px-4 py-2 border border-orange-400 rounded-3xl bg-white"
              label="Ingrese una observación"
              value={value}
              onChangeText={onChange}
              multiline
            />
          )}
        />
        {errors.observation && (
          <ThemedHelperText isVisible={Boolean(errors.observation)}>
            {errors.observation?.message}
          </ThemedHelperText>
        )}

        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          className="bg-orange-400 w-4/6 mt-2 rounded-lg"
          disabled={createObservation.isPending}
          isLoading={createObservation.isPending}
        >
          <ThemedText
            variant="h4"
            className="text-white uppercase w-full text-center font-semibold tracking-widest"
          >
            Ingresar
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
};

export default ObservacionesScreen;
