import React from "react";
import { Keyboard, View } from "react-native";
import { Href, router } from "expo-router";

import {
  Tab,
  ThemedButton,
  ThemedHelperText,
  ThemedInput,
  ThemedTabs,
  ThemedView,
} from "@/presentation/theme/components";
import { searchReqSchema } from "@/presentation/shared/validations";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTabIndex, useTabNavigation } from "react-native-paper-tabs";
import { Button, Paragraph, Title } from "react-native-paper";

const ExploreWithHookExamples = () => {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex: 1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
};

const tabs: Tab[] = [
  {
    label: "Explore",
    icon: "compass",
    component: <ExploreWithHookExamples />,
  },
  {
    label: "Flights",
    icon: "airplane",
    component: <View style={{ backgroundColor: "black", flex: 1 }} />,
    disabled: true,
  },
  {
    label: "Trips",
    icon: "bag-suitcase",
    component: <View style={{ backgroundColor: "red", flex: 1 }} />,
    badge: true,

  },
];

interface SearchReqProps {
  screenLink: Href;
}

export const SearchReq = ({ screenLink }: SearchReqProps) => {
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
    <>
      <ThemedTabs
        tabs={tabs}
        showTextLabel
      />
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
    </>
  );
};
