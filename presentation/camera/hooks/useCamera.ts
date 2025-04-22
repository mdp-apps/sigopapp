import { useRef, useState } from "react";
import { Alert } from "react-native";

import { useCameraStore } from "@/presentation/shared/store";

import { router } from "expo-router";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export const useCamera = () => {
  const { addSelectedImage } = useCameraStore();

  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [selectedImage, setSelectedImage] = useState<string>();

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } =
        await requestCameraPermission();
      if (cameraPermissionStatus !== "granted") {
        Alert.alert(
          "Lo siento",
          "Necesitamos permiso para acceder a la cámara para tomar fotos."
        );
        return;
      }

      const { status: mediaPermissionStatus } = await requestMediaPermission();
      if (mediaPermissionStatus !== "granted") {
        Alert.alert(
          "Lo siento",
          "Necesitamos permiso para acceder a la galería para guardar las fotos tomadas."
        );
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Algo salió mal al solicitar los permisos.");
    }
  };

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });
    console.log(JSON.stringify(picture, null, 2));

    if (!picture?.uri) return;

    setSelectedImage(picture.uri);
  };

  const onReturnCancel = () => {
    router.dismiss();
  };

  const onPictureAccepted = async () => {
    if (!selectedImage) return;

    await MediaLibrary.createAssetAsync(selectedImage);

    addSelectedImage(selectedImage);

    router.dismiss();
  };

  const onRetakePhoto = () => {
    setSelectedImage(undefined);
  };

  const onPickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.5,
      aspect: [4, 3],
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;

    // console.log(JSON.stringify(result.assets, null, 2));

    result.assets.forEach((asset) => {
      addSelectedImage(asset.uri);
    });

    router.dismiss();
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return {
    selectedImage,
    cameraRef,
    cameraPermission,
    mediaPermission,
    onRequestPermissions,
    facing,

    onShutterButtonPress,
    onReturnCancel,
    onPictureAccepted,
    onRetakePhoto,
    onPickImages,
    toggleCameraFacing,
  };
};
