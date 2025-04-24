import { useCameraStore } from "@/presentation/shared/store";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ImageAdapter } from "@/config/adapters";

type UploadObsImageBody = {
  fileImages: string[];
  reqCode: string;
};

export const useUploadObservationImgMutation = () => {
  const { clearImages } = useCameraStore();

  const uploadObservationImage = useMutation({
    mutationFn: (data: UploadObsImageBody) => {
      return UseCases.uploadReqObservationImageUseCase(sigopApiFetcher, {
        file: data.fileImages.at(-1)!,
        requerimiento: data.reqCode,
        filename: ImageAdapter.prepareImages(data.fileImages).at(-1)!,
      });
    },
    onSuccess: (data) => {
      if (data === "OK") {
       clearImages();
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return {
    uploadObservationImage,
  };
};