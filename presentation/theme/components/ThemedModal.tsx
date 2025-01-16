import { Dimensions } from "react-native";
import { ModalProps } from "react-native";
import { StyleSheet, Modal as NativeModal, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface ThemedModalProps extends ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  hideModal: () => void;
  isNativeModal?: boolean;
  isTransparent?: boolean;
  isFullModal?: boolean;
}

const { width } = Dimensions.get("window");

export const ThemedModal = ({
  children,
  isVisible,
  hideModal,
  isTransparent = true,
  isNativeModal = false,
  isFullModal,
  ...rest
}: ThemedModalProps) => {
  return isNativeModal ? (
    <NativeModal
      animationType="slide"
      transparent={isTransparent}
      visible={isVisible}
      onRequestClose={hideModal}
      onDismiss={hideModal}
      {...rest}
    >
      <View className="flex-1 flex-row justify-center items-center bg-black/50">
        <View
          className={[
            "flex-1 justify-center bg-white p-5 my-5 rounded-lg mx-3",
          ].join(" ")}
          style={{ width: isFullModal ? width * 0.9 : width * 0.8 }}
        >
          {children}
        </View>
      </View>
    </NativeModal>
  ) : (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerModal}
        dismissable={true}
      >
        <View style={styles.modalContent}>{children}</View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    justifyContent: "center",
    width: width * 0.9,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
