import React, { useEffect, useState } from "react";
import { SectionList, View } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";

import { useCameraStore } from "@/presentation/shared/store";
import { useVisibility } from "@/presentation/shared/hooks";
import { useThemeColor } from "@/presentation/theme/hooks";
import { useReqByCode, useReqByPatent } from "@/presentation/req/hooks";
import {
  useObservationMutation,
  useReqObservations,
  useUploadObservationImgMutation,
} from "@/presentation/observacion/hooks";

import { NoDataCard } from "@/presentation/shared/components";
import {
  ThemedButton,
  ThemedDataTable,
  ThemedHelperText,
  ThemedImage,
  ThemedInput,
  ThemedLoader,
  ThemedModal,
  ThemedSnackbar,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import { ReqInfo } from "@/presentation/req/components";
import { observationSchema } from "@/presentation/shared/validations";

import { ObservationReq } from "@/infrastructure/entities";
import { SectionListMapper } from "@/infrastructure/mappers";
import { REQ_OBSERVATIONS_COLUMNS } from "@/config/constants";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ObservacionesScreen = () => {
  const [observationModal, setObservationModal] =
    useState<ObservationReq | null>(null);

  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const grayColor = useThemeColor({}, "gray");
  const grayDarkColor = useThemeColor({}, "darkGray");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof observationSchema>>({
    resolver: zodResolver(observationSchema),
    defaultValues: {
      observation: "",
    },
  });

  const { reqCode, patent } = useGlobalSearchParams();
  const { selectedImages, clearImages } = useCameraStore();

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const { queryReqByCode } = useReqByCode(reqCode as string);
  const { queryReqByPatent, reqCodeByPatent } = useReqByPatent(
    patent as string
  );
  const { queryObservations } = useReqObservations(
    reqCode ? Number(reqCode) : reqCodeByPatent
  );
  const { createObservation, snackbar, dismissSnackbar } =
    useObservationMutation();
  const { uploadObservationImage } = useUploadObservationImgMutation();

  useEffect(() => {
    return () => clearImages();
  }, []);

  const handleModal = (logStatusReq: ObservationReq) => {
    setObservationModal(logStatusReq);
    showModal();
  };

  const onSubmit = async (values: z.infer<typeof observationSchema>) => {
    if (selectedImages.length > 0) {
      uploadObservationImage.mutate({
        fileImages: selectedImages,
        reqCode: reqCode ? String(reqCode) : String(reqCodeByPatent),
      });
    }

    createObservation.mutate({
      reqCode: reqCode ? Number(reqCode) : reqCodeByPatent,
      commment: values.observation,
      pathImg: selectedImages,
    });

    reset({ observation: "" });
  };

  if (queryReqByCode.isLoading || queryReqByPatent.isLoading) {
    return <ThemedLoader color={grayColor} size="large" />;
  }

  if (queryReqByCode.isError || queryReqByPatent.isError) {
    return (
      <ThemedView safe className="items-center justify-center">
        <NoDataCard
          message={
            queryReqByCode.error?.message! || queryReqByPatent.error?.message!
          }
          iconSource="alert-circle"
          iconColor="red"
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView keyboardAvoiding>
      <ReqInfo req={reqCode ? queryReqByCode.data! : queryReqByPatent.data!} />

      {selectedImages.length > 0 && (
        <ThemedImage
          className="mx-auto rounded-xl border-2 border-gray-100"
          url={selectedImages.at(-1)!}
        />
      )}

      <ThemedView className="flex-1 items-center gap-4" margin>
        <Controller
          control={control}
          name="observation"
          render={({ field: { onChange, value } }) => (
            <ThemedInput
              style={{ height: 100, borderRadius: 20 }}
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

        <View className="flex-row items-center gap-4 mb-4">
          <ThemedButton
            onPress={handleSubmit(onSubmit)}
            className="bg-orange-400 w-4/6 rounded-lg"
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

          <ThemedButton
            onPress={() => router.push("/camera")}
            className="border border-light-primary bg-white rounded-lg !p-2.5"
            variant="icon"
            iconName={selectedImages.length > 0 ? "camera-retake" : "camera"}
            iconColor={primaryColor}
          />
        </View>

        <ThemedSnackbar
          visible={snackbar.visible}
          onDismiss={dismissSnackbar}
          message={snackbar.message}
          actionLabel="Cerrar"
          duration={5000}
        />
      </ThemedView>


      {selectedImages.length === 0 && (
        <ThemedDataTable<ObservationReq>
          handleRowPress={handleModal}
          data={queryObservations.data ?? []}
          columns={REQ_OBSERVATIONS_COLUMNS}
          getRowKey={(item) => item.observationId}
          headerStyle={{
            borderBottomColor: grayColor,
            marginBottom: 10,
          }}
          isLoading={queryObservations.isLoading}
          textData="No hay observaciones para mostrar"
          columnCellStyle={{
            fontWeight: "700",
            color: grayDarkColor,
            textTransform: "uppercase",
          }}
          rowStyle={{ borderBottomColor: grayColor }}
          cellStyle={{ fontWeight: "400", color: textColor }}
        />
      )}

      <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
        <SectionList
          sections={SectionListMapper.fromObservationToSectionList(
            observationModal!
          )}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => (
            <ThemedText
              variant="h3"
              className="uppercase font-semibold !text-slate-900 mb-6"
              adjustsFontSizeToFit
            >
              Detalle observación
            </ThemedText>
          )}
          renderSectionHeader={({ section }) => (
            <ThemedText
              variant="h4"
              className="uppercase font-semibold !text-slate-700"
              adjustsFontSizeToFit
            >
              {section.title}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <ThemedText
              variant="h5"
              className="!text-slate-800 py-3"
              adjustsFontSizeToFit
            >
              {item}
            </ThemedText>
          )}
          ListFooterComponent={() =>
            observationModal?.urlImg && (
              <>
                <ThemedText
                  variant="h4"
                  className="uppercase font-semibold !text-slate-700 mb-2"
                  adjustsFontSizeToFit
                >
                  Imagen de la observación
                </ThemedText>

                <ThemedImage
                  className="rounded-lg"
                  url={observationModal.urlImg}
                />
              </>
            )
          }
        />
      </ThemedModal>
    </ThemedView>
  );
};

export default ObservacionesScreen;
