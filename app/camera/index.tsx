import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { CameraView } from "expo-camera";

import { useCamera } from "@/presentation/camera/hooks";
import { ThemedText } from "@/presentation/theme/components";
import {
  ConfirmImageButton,
  FlipCameraButton,
  GalleryButton,
  RetakeImageButton,
  ReturnCancelButton,
  ShutterButton,
} from "@/presentation/camera/components";
import { useCameraStore } from "@/presentation/shared/store";

export default function CameraScreen() {
  const {
    selectedImage,
    cameraRef,
    cameraPermission,
    onRequestPermissions,
    facing,

    onShutterButtonPress,
    onReturnCancel,
    onPictureAccepted,
    onRetakePhoto,
    onPickImages,
    toggleCameraFacing,
  } = useCamera();

  const { selectedImages } = useCameraStore();
    console.log(selectedImages);

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View className="flex-1 justify-center items-center mx-8">
        <Text className="text-center text-lg pb-3">
          Necesitamos permisos para acceder a la cámara y la galería.
        </Text>

        <TouchableOpacity onPress={onRequestPermissions}>
          <ThemedText>Solicitar permiso</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center">
      {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage }} className="flex-1" />

          <ConfirmImageButton onPress={onPictureAccepted} />

          <RetakeImageButton onPress={onRetakePhoto} />

          <ReturnCancelButton onPress={onReturnCancel} />
        </>
      ) : (
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
          <ShutterButton onPress={onShutterButtonPress} />

          <FlipCameraButton onPress={toggleCameraFacing} />

          <GalleryButton onPress={onPickImages} />

          <ReturnCancelButton onPress={onReturnCancel} />
        </CameraView>
      )}
    </View>
  );
}
