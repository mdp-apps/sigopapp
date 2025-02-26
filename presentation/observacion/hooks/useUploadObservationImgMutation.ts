import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

type UploadObsImageBody = {
  fileImage: string;
  reqCode: string;
  fileName: string;
}

export const useUploadObservationImgMutation = () => {

 const uploadObservationImage = useMutation({
   mutationFn: (data: UploadObsImageBody) => {
     return UseCases.uploadReqObservationImageUseCase(sigopApiFetcher, {
       file: data.fileImage,
       requerimiento: data.reqCode,
       filename: data.fileName,
     });
   },
   onSuccess: (data) => {},
   onError: (error) => {
     Alert.alert("Error", error.message);
   },
 });

  return {
    uploadObservationImage,
  };
};
