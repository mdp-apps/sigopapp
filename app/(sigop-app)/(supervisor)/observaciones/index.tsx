import React, { useState } from "react";

import {
  Button,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import { ActivityIndicator, Divider } from "react-native-paper";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import { useAuthStore } from "@/presentation/auth/store";
import { useThemeColor } from "@/presentation/theme/hooks";
import { useFilters, useVisibility } from "@/presentation/shared/hooks";
import { useReqByCode } from "@/presentation/req/hooks";
import {
  useInsertObservation,
  useObservationImage,
  useReqObservations,
  useUploadObservationImage,
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

import { ObservationReq } from "@/infrastructure/entities";
import { AlertNotifyAdapter, AlertType } from "@/config/adapters";
import ObservationCard from "@/presentation/observacion/components/ObservationCard";

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
  const [observation, setObservation] = useState("");

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

  const { req, isLoadingReq, getReqByCode } = useReqByCode();
  const { reqObservations, isLoadingReqObservations } = useReqObservations(
    filters.req
  );
  const { uploadObservationImage, isLoadingUploadImage } =
    useUploadObservationImage();
  const { insertObservation } = useInsertObservation();
  const {
    imageObservation,
    imageObservationBase64,
    isLoadingObservationImage,
  } = useObservationImage();

  const { user } = useAuthStore();

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImageName(result.assets[0].fileName!);
      setImage(result.assets[0].uri!);
    }
  };

  const insertarComentario = async (texto: string) => {
    if (imageName) {
      await uploadImage();
      return;
    }

    if (texto) {
      const responseData = await insertObservation({
        reqCode: filters.req,
        commment: texto,
        path: imageName,
        userCode: user?.code || 0,
      });

      if (responseData.result === "OK") {
        setImage(null);
        setObservation("");

        AlertNotifyAdapter.show({
          type: AlertType.SUCCESS,
          title: "Comentario ingresado.",
          textBody: "El comentario ha sido ingresado correctamente.",
          button: "ACEPTAR",
        });

        return;
      }

      AlertNotifyAdapter.show({
        type: AlertType.WARNING,
        title: "Comentario no ingresado.",
        textBody:
          "El comentario no ha sido ingresado, favor revise los campos requeridos.",
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
  };

  const uploadImage = async () => {
    if (image) {
      const responseData = await uploadObservationImage(
        image,
        filters.req,
        imageName
      );

      if (responseData === "OK") {
        setImage(null);
        setObservation("");

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
      const path = `${FileSystem.documentDirectory}${fileName}`; // Guardar en la carpeta de documentos

      // Guardar la imagen en el dispositivo
      await FileSystem.writeAsStringAsync(path, imageObservationBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

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
        handleCloseModal={async () => {
          await getReqByCode(filters.req);
          handleCloseModal();
        }}
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

      {Object.keys(req).length > 0 && (
        <View className="flex-1 mt-3">
          <View className="flex flex-row flex-wrap gap-2">
            <ThemedChip
              tooltipTitle="Tipo requerimiento"
              iconSource="format-list-bulleted-type"
              text={req.nameReqFormat}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />

            <ThemedChip
              tooltipTitle="Fecha y turno"
              iconSource="calendar-clock-outline"
              text={`${req.date} - [T${req.turn}]`}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />

            <ThemedChip
              tooltipTitle="Rut conductor"
              iconSource="steering"
              text={req.rutDriver}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />

            <ThemedChip
              tooltipTitle="Cliente"
              iconSource="account-tie"
              text={req.customerAbbr}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />

            <ThemedChip
              tooltipTitle="Patente"
              iconSource="car-info"
              text={req.vehiclePatent}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />

            <ThemedChip
              tooltipTitle="Transportista"
              iconSource="truck-delivery"
              text={req.carrierName}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />

            <ThemedChip
              tooltipTitle="Estado"
              iconSource="debug-step-over"
              text={req.statusName}
              textStyle={{ fontSize: 16 }}
              style={{ backgroundColor: quaternaryColor }}
            />
          </View>

          <Divider />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-1 p-2">
              <ThemedInput
                style={{ color: blackColor }}
                label="Ingrese una observación"
                value={observation}
                onChangeText={(text) => setObservation(text)}
                multiline={true}
                iconRight={{
                  icon: "camera",
                  color: blackColor,
                  onPress: pickImage,
                }}
              />

              {image && (
                <View className="flex-row justify-center items-center">
                  <Image source={{ uri: image }} className="w-80 h-80 mt-4" />
                </View>
              )}

              <View className="flex-row justify-center items-center gap-5 my-4">
                <ThemedButton
                  className="flex-1 bg-blue-800 rounded-md py-3"
                  onPress={() => insertarComentario(observation)}
                  disabled={isLoadingReqObservations}
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
                    setObservation("");
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

                <FlatList
                  data={reqObservations}
                  renderItem={({ item }) => (
                    <ObservationCard observation={item} showModal={showModal} />
                  )}
                  keyExtractor={(item) => String(item.observationId)}
                />

                <ThemedModal isVisible={isVisibleModal} hideModal={hideModal}>
                  {isLoadingReqObservations ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <View>
                      <Image
                        source={{ uri: imageObservation }}
                        className="w-80 h-80"
                      />

                      <ThemedButton
                        text={
                          isLoadingObservationImage
                            ? "Descargando..."
                            : "Descargar Imagen"
                        }
                        onPress={descargarImagen}
                        disabled={isLoadingObservationImage}
                      />
                    </View>
                  )}
                </ThemedModal>
              </SafeAreaView>
            </View>
          </ScrollView>
        </View>
      )}
    </ThemedView>
  );
};

export default ObservacionesScreen;
