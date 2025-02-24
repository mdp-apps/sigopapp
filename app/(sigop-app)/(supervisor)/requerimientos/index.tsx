import { ThemedText, ThemedView } from "@/presentation/theme/components";

const RequerimientosPalizadaScreen = () => {
  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <ThemedText className="text-2xl font-ruda-bold uppercase">
        Requerimientos
      </ThemedText>
    </ThemedView>
  );
};

export default RequerimientosPalizadaScreen;
