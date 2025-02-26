import React, { useEffect, useState } from "react";

import { View, FlatList, SafeAreaView, Image, Alert } from "react-native";

import { ActivityIndicator, Divider } from "react-native-paper";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import { useAuthStore } from "@/presentation/auth/store";
import { useThemeColor } from "@/presentation/theme/hooks";
import { useFilters, useVisibility } from "@/presentation/shared/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import {
  useObservationMutation,
  useObservationImage,
  useReqObservations,
  useUploadObservationImgMutation,
} from "@/presentation/observacion/hooks";

import {
  ThemedButton,
  ThemedChip,
  ThemedInput,
  ThemedModal,
  ThemedText,
  ThemedView,
} from "@/presentation/theme/components";
import {
  Filter,
  FilterModal,
  ScrollFilters,
} from "@/presentation/shared/components";
import { observationSchema } from "@/presentation/shared/validations";
import { ObservationCard } from "@/presentation/observacion/components";

import { AlertNotifyAdapter, AlertType } from "@/config/adapters";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FILTERS = {
  REQ: "req",
};

const FILTER_LABELS = {
  req: "Requerimiento",
};

const initialFilterValues = {
  req: "",
};

const ObservacionesScreen = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof observationSchema>>({
    resolver: zodResolver(observationSchema),
    defaultValues: {
      observation: "",
    },
  });

  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");

  const quaternaryColor = useThemeColor({}, "quaternary");
  const blackColor = useThemeColor({}, "text");

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const {
    filters,
    selectedFilter,
    filterKeys,
    isModalVisible,
    updateFilter,
    handleFilterSelect,
    handleCloseModal,
  } = useFilters(initialFilterValues, FILTERS);

  const { queryReqByCode } = useReqByCode(filters.req);
  const { queryObservations } = useReqObservations(filters.req);
  const { uploadObservationImage } = useUploadObservationImgMutation();
  const { createObservation } = useObservationMutation();
  const { queryObservationImage } = useObservationImage();

  const { user } = useAuthStore();

  useEffect(() => {
    if (errors.observation) {
      AlertNotifyAdapter.show({
        type: AlertType.WARNING,
        title: "Comentario no ingresado.",
        textBody: errors.observation.message,
        button: "ACEPTAR",
      });
    }
  }, [errors]);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(JSON.stringify(result, null, 2));

    if (!result.canceled) {
      setImageName(result.assets[0].fileName!);
      setImage(result.assets[0].uri!);
    }
  };

  const onSubmit = async (values: z.infer<typeof observationSchema>) => {
    if (imageName) {
      await uploadImage();
      return;
    }

    if (values.observation) {
      createObservation.mutate({
        reqCode: filters.req,
        commment: values.observation,
        path: imageName,
        userCode: user?.code || 0,
      });

      if (createObservation.data && createObservation.data.result === "OK") {
        setImage(null);
        setValue("observation", "");

        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Comentario ingresado.",
          textBody: "El comentario ha sido ingresado correctamente.",
          button: "ACEPTAR",
        });
      } else {
        AlertNotifyAdapter.show({
          type: AlertType.WARNING,
          title: "Comentario no ingresado.",
          textBody:
            "El comentario no ha sido ingresado, hubo un error en el servidor.",
          button: "ACEPTAR",
        });
      }
    }
  };

  const uploadImage = async () => {
    if (image) {
      uploadObservationImage.mutate({
        fileImage: image,
        reqCode: filters.req,
        fileName: imageName,
      });

      if (uploadObservationImage.data === "OK") {
        setImage(null);
        setValue("observation", "");

        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Comentario ingresado.",
          textBody: "El comentario ha sido ingresado correctamente.",
          button: "ACEPTAR",
        });
      } else {
        AlertNotifyAdapter.show({
          type: AlertType.WARNING,
          title: "Comentario no ingresado.",
          textBody:
            "El comentario no ha sido ingresado, favor revise los campos requeridos.",
          button: "ACEPTAR",
        });
      }
    }
  };

  const descargarImagen = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Se necesita acceso al almacenamiento para guardar la imagen."
        );
        return;
      }
      const fileName = `${filters.req}.jpg`; // Nombre del archivo
      const path = `${FileSystem.documentDirectory}${fileName}`;

      // Guardar la imagen en el dispositivo
      if (queryObservationImage.data) {
        await FileSystem.writeAsStringAsync(
          path,
          queryObservationImage.data?.base64Str,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
      }

      const asset = await MediaLibrary.createAssetAsync(path);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      console.log("Éxito", `Imagen guardada en: ${path}`);
    } catch (error) {
      console.error("Error guardando la imagen:", error);
      console.log("Error", "No se pudo guardar la imagen.");
    }
  };

  return (
    <ThemedView className="px-3">
      <FlatList
        data={queryObservations.data}
        renderItem={({ item }) => (
          <ObservationCard observation={item} showModal={showModal} />
        )}
        keyExtractor={(item) => String(item.observationId)}
        ListHeaderComponent={
          <>
            <ScrollFilters>
              {filterKeys.map((filterKey) => (
                <Filter
                  key={filterKey}
                  onPress={() => handleFilterSelect(filterKey)}
                  filterKey={filterKey}
                  filterLabels={FILTER_LABELS}
                  displayValue={filters[filterKey]}
                />
              ))}
            </ScrollFilters>

            <FilterModal
              isModalVisible={isModalVisible}
              handleCloseModal={handleCloseModal}
            >
              {selectedFilter === "req" && (
                <ThemedInput
                  autoCapitalize="characters"
                  label="Requerimiento"
                  onChangeText={(value) => updateFilter("req", value)}
                  value={filters.req}
                  placeholder="Ingrese el código de requerimiento"
                />
              )}
            </FilterModal>

            <Divider />

            {queryReqByCode.data && (
              <View className="flex-1 mt-3">
                <View className="flex flex-row flex-wrap gap-2">
                  <ThemedChip
                    tooltipTitle="Tipo requerimiento"
                    iconSource="format-list-bulleted-type"
                    text={queryReqByCode.data.nameReqFormat}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />

                  <ThemedChip
                    tooltipTitle="Fecha y turno"
                    iconSource="calendar-clock-outline"
                    text={`${queryReqByCode.data.date} - [T${queryReqByCode.data.turn}]`}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />

                  <ThemedChip
                    tooltipTitle="Rut conductor"
                    iconSource="steering"
                    text={queryReqByCode.data.rutDriver}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />

                  <ThemedChip
                    tooltipTitle="Cliente"
                    iconSource="account-tie"
                    text={queryReqByCode.data.customerAbbr}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />

                  <ThemedChip
                    tooltipTitle="Patente"
                    iconSource="car-info"
                    text={queryReqByCode.data.vehiclePatent}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />

                  <ThemedChip
                    tooltipTitle="Transportista"
                    iconSource="truck-delivery"
                    text={queryReqByCode.data.carrierName}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />

                  <ThemedChip
                    tooltipTitle="Estado"
                    iconSource="debug-step-over"
                    text={queryReqByCode.data.statusName}
                    textStyle={{ fontSize: 16 }}
                    style={{ backgroundColor: quaternaryColor }}
                  />
                </View>

                <Divider />

                <View className="flex-1 p-2">
                  <Controller
                    control={control}
                    name="observation"
                    render={({ field: { onChange, value } }) => (
                      <ThemedInput
                        style={{ color: blackColor }}
                        label="Ingrese una observación"
                        value={value}
                        onChangeText={onChange}
                        multiline={true}
                        iconRight={{
                          icon: "camera",
                          color: blackColor,
                          onPress: pickImage,
                        }}
                      />
                    )}
                  />

                  {image && (
                    <View className="flex-row justify-center items-center">
                      <Image
                        source={{ uri: image }}
                        className="w-80 h-80 mt-4"
                      />
                    </View>
                  )}

                  <View className="flex-row justify-center items-center gap-5 my-4">
                    <ThemedButton
                      className="flex-1 bg-blue-800 rounded-md py-3"
                      onPress={handleSubmit(onSubmit)}
                      disabled={queryObservations.isLoading}
                    >
                      <ThemedText
                        variant="h3"
                        className="text-white font-ruda-bold"
                      >
                        Ingresar
                      </ThemedText>
                    </ThemedButton>

                    <ThemedButton
                      className="flex-1 bg-light-tomato rounded-md"
                      onPress={() => {
                        setValue("observation", "");
                        setImage(null);
                      }}
                    >
                      <ThemedText
                        variant="h3"
                        className="text-white font-ruda-bold"
                      >
                        Limpiar
                      </ThemedText>
                    </ThemedButton>
                  </View>

                  <SafeAreaView className="flex-1">
                    <ThemedText
                      variant="h2"
                      className="text-center font-semibold mb-3"
                    >
                      Historial de observaciones
                    </ThemedText>
                  </SafeAreaView>
                </View>
              </View>
            )}
          </>
        }
        ListFooterComponent={
          <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
            {queryObservations.isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <Image
                  source={{ uri: queryObservationImage.data?.imageUrl }}
                  className="w-80 h-80"
                />

                <ThemedButton
                  text={
                    queryObservationImage.isLoading
                      ? "Descargando..."
                      : "Descargar Imagen"
                  }
                  onPress={descargarImagen}
                  disabled={queryObservationImage.isLoading}
                />
              </View>
            )}
          </ThemedModal>
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

export default ObservacionesScreen;
