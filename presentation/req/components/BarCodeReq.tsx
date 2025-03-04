import React from "react";

import Barcode from "@kichiyaki/react-native-barcode-generator";

interface BarCodeReqProps {
  dataToEncode: string;
  dataToShow: string;
}

export const BarCodeReq = ({ dataToEncode, dataToShow }: BarCodeReqProps) => {
  return (
    dataToEncode && (
      <Barcode
        format="CODE128B"
        value={dataToEncode}
        text={dataToShow}
        maxWidth={350}
        textStyle={{ fontSize: 16, marginVertical: 10 }}
      />
    )
  );
};
