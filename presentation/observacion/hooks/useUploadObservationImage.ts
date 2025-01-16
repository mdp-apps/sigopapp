import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";


export const useUploadObservationImage = () => {

  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  const uploadObservationImage = async (
    fileImage: string,
    reqCode: string,
    fileName: string,
  ) => {
    setIsLoadingUploadImage(true);
    
    const response = await UseCases.uploadReqObservationImageUseCase(
      sigopApiFetcher,
      {
        file: fileImage,
        requerimiento: reqCode,
        filename: fileName,
      }
    );
    console.log("UploadObservationImage", JSON.stringify(response));

    setIsLoadingUploadImage(false);

    return response;
  };

  return {
    isLoadingUploadImage,
    uploadObservationImage,
  };
};
