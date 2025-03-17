import React from "react";
import { View } from "react-native";

import { ThemedButton, ThemedModal } from "@/presentation/theme/components";

interface FilterModalProps {
  children: React.ReactNode;
  isModalVisible: boolean;
  handleCloseModal: () => void;
}

export const FilterModal = ({
  children,
  isModalVisible,
  handleCloseModal,
}: FilterModalProps) => {
  return (
    <ThemedModal isVisible={isModalVisible} hideModal={handleCloseModal}>
      <View className="mt-2">
        {children}

        <ThemedButton
          variant="rounded"
          className="bg-light-primary mt-4"
          onPress={handleCloseModal}
          text="Aplicar filtro"
          textClassName="font-semibold text-white"
        />
      </View>
    </ThemedModal>
  );
};
