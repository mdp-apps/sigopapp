import { View } from "react-native";
import { router } from "expo-router";

import { ThemedButton, ThemedText } from "@/presentation/theme/components";

import QRCodeStyled from "react-native-qrcode-styled";

interface QRCodeReqProps {
  reqCode: string;
  dataToEncode: string;
}

export const QRCodeReq = ({ reqCode, dataToEncode }: QRCodeReqProps) => {

  return (
    <View className="flex-1 justify-center items-center">
      <ThemedButton
        className="absolute top-8 py-3 px-8 bg-cyan-700 rounded-md"
        onPress={() => router.back()}
      >
        <ThemedText variant="h4" className="text-white font-ruda-bold">
          Cerrar
        </ThemedText>
      </ThemedButton>

      {dataToEncode && (
        <View className="flex-1 justify-center items-center gap-6">
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
