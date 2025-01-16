import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useObservationImage = () => {
  const [imageObservation, setImageObservation] = useState("");
  const [imageObservationBase64, setImageObservationBase64] = useState("");
  const [isLoadingObservationImage, setIsLoadingObservationImage] =
    useState(false);

  const getObservationImage = async (
    reqCode: number,
    fileName: string,
    method: string
  ) => {
    setIsLoadingObservationImage(true);

    const [imageUrl, imageBase64] =
      await UseCases.getReqObservationImageUseCase(sigopApiFetcher, {
        requerimiento: String(reqCode),
        filename: fileName,
        method: method,
      });
    console.log("getObservationImage", [imageUrl, imageBase64]);

    setImageObservation(imageUrl);
    setImageObservationBase64(imageBase64);
    setIsLoadingObservationImage(false);
  };

  return {
    getObservationImage,

    isLoadingObservationImage,
    imageObservation,
    imageObservationBase64,
  };
};
