import { ThemedText, ThemedView } from "@/presentation/theme/components";

const ConfigurarPalletsScreen = () => {
  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <ThemedText className="text-2xl font-ruda-bold uppercase">
        Configurar Pallets
      </ThemedText>
    </ThemedView>
  );
};

export default ConfigurarPalletsScreen;
