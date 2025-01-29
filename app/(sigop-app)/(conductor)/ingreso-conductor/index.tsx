import { useLocalSearchParams } from "expo-router";

import { ThemedView } from "@/presentation/theme/components";
import { QRCodeReq } from "@/presentation/req/components";

const IngresoConductorScreen = () => {
  const { reqCode, vehiclePatent } = useLocalSearchParams();

  const qrDataToEncode = `{"patente":"${vehiclePatent}","requerimiento":"${reqCode}"}`;

  return (
    <ThemedView className="flex-1 justify-center items-center" margin safe>
      <QRCodeReq reqCode={String(reqCode)} dataToEncode={qrDataToEncode} />
    </ThemedView>
  );
};

export default IngresoConductorScreen;
