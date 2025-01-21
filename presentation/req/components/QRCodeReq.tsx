import { View } from "react-native";

import { ThemedButton, ThemedText } from "@/presentation/theme/components";

import QRCodeStyled from "react-native-qrcode-styled";

interface QRCodeReqProps {
  reqCode: string;
  dataToEncode: string;
  hideModal: () => void;
}

export const QRCodeReq = ({ reqCode, dataToEncode, hideModal }: QRCodeReqProps) => {
  console.log(JSON.stringify(dataToEncode, null, 2));

  return (
    <View className="flex-1 justify-center items-center">
      <ThemedButton
        className="absolute top-8 py-3 px-8 bg-cyan-700 rounded-md"
        onPress={hideModal}
      >
        <ThemedText variant="h4" className="text-white font-ruda-bold">
          Cerrar
        </ThemedText>
      </ThemedButton>

      {dataToEncode && (
        <View className="flex-1 justify-center items-center">
          <QRCodeStyled
            data={dataToEncode}
            pieceSize={9}
            padding={20}
            errorCorrectionLevel={"M"}
            color="black"
            outerEyesOptions={{
              borderRadius: 8,
              color: "#1687a7",
            }}
            innerEyesOptions={{
              borderRadius: 2,
              color: "#000",
            }}
            logo={{
              href: require("../../../assets/logo.png"),
              scale: 1.2,
              hidePieces: true,
            }}
          />

          <ThemedText variant="h4" className="font-ruda-bold">
            Requerimiento: {reqCode}
          </ThemedText>
        </View>
      )}
    </View>
  );
};
