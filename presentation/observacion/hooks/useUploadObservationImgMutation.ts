
import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ImageAdapter } from "@/config/adapters";

type UploadObsImageBody = {
  fileImages: string[];
  reqCode: string;
  fileNames: string[];
}

export const useUploadObservationImgMutation = () => {

 const uploadObservationImage = useMutation({
   mutationFn: (data: UploadObsImageBody) => {
     return UseCases.uploadReqObservationImageUseCase(sigopApiFetcher, {
       file: data.fileImages[0],
       requerimiento: data.reqCode,
       filename: ImageAdapter.prepareImages(data.fileNames)[0],
     });
   },
   onSuccess: (data) => {
      console.log({ dataUpload: data });
   },
   onError: (error) => {
     Alert.alert("Error", error.message);
   },
 });

  return {
    uploadObservationImage,
  };
};
