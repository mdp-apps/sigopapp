import { ThemedText, ThemedView } from "@/presentation/theme/components";

const MovInternosScreen = () => {
  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <ThemedText className="text-2xl font-ruda-bold uppercase">
        Movimientos Internos
      </ThemedText>
    </ThemedView>
  );
};

export default MovInternosScreen;
