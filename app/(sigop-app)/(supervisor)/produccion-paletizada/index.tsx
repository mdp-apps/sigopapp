import { ThemedText, ThemedView } from "@/presentation/theme/components";

const ProduccionPalizadaScreen = () => {
  return (
    <ThemedView
      className="justify-center items-center gap-3"
      margin
      safe
    >
      <ThemedText
        className="text-2xl font-ruda-bold uppercase"
      >
        Producción paletizada
      </ThemedText>
    </ThemedView>
  );
};

export default ProduccionPalizadaScreen;
