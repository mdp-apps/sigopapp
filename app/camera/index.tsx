import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { CameraView } from "expo-camera";

import { useCamera } from "@/presentation/camera/hooks";
import { ThemedButton, ThemedText } from "@/presentation/theme/components";
import { NoDataCard } from "@/presentation/shared/components";
import {
  ConfirmImageButton,
  FlipCameraButton,
  GalleryButton,
  RetakeImageButton,
  ReturnCancelButton,
  ShutterButton,
} from "@/presentation/camera/components";

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

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View className="flex-1 justify-center">
        <NoDataCard
          message="Necesitamos permisos para acceder a la cámara y la galería."
          iconSource="lock-question"
        >
          <ThemedButton
            onPress={onRequestPermissions}
            className="bg-orange-400 w-4/6 rounded-lg mt-4"
            textClassName="text-white w-full text-center tracking-widest text-xl"
            text="Solicitar permiso"
          />
        </NoDataCard>
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
