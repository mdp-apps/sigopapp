import React from "react";

import { ThemedText, ThemedView } from "@/presentation/theme/components";

const SaldosScreen = () => {
  return (
    <ThemedView className="justify-center items-center gap-3" margin safe>
      <ThemedText className="text-2xl font-ruda-bold uppercase">
        Saldos
      </ThemedText>
    </ThemedView>
  );
};

export default SaldosScreen;
