import { Button } from "react-native-paper";
import { ThemedModal } from "@/presentation/theme/components";

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
    <ThemedModal
      isVisible={isModalVisible}
      hideModal={handleCloseModal}
      isNativeModal
    >
      {children}
      
      <Button
        mode="contained"
        onPress={handleCloseModal}
        style={{ marginTop: 16, backgroundColor: "#0000ff" }}
      >
        Aplicar filtro
      </Button>
    </ThemedModal>
  );
};
