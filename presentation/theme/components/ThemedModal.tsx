import React from "react";
import {
  Dimensions,
  Modal as NativeModal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

interface ThemedModalContentProps extends ModalProps {
  children: React.ReactNode;
  isFullModal?: boolean;
}

interface ThemedModalProps extends ThemedModalContentProps {
  isVisible: boolean;
  hideModal: () => void;
  isNativeModal?: boolean;
  isTransparent?: boolean;
  hasAutomaticClosing?: boolean;
}

const { width } = Dimensions.get("window");

export const ThemedModal = ({
  children,
  isVisible,
  hideModal,
  isTransparent = true,
  isNativeModal = false,
  isFullModal,
  hasAutomaticClosing = true,
  className,
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
      {hasAutomaticClosing ? (
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 flex-row justify-center items-center bg-black/50">
            <View
              className={[
                "flex-1 justify-center bg-white p-5 my-5 rounded-lg mx-3",
                className,
              ].join(" ")}
              style={{ width: isFullModal ? width * 0.9 : width * 0.8 }}
            >
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View className="flex-1 flex-row justify-center items-center bg-black/50">
          <View
            className={[
              "flex-1 justify-center bg-white p-5 my-5 rounded-lg mx-3",
              className,
            ].join(" ")}
            style={{ width: isFullModal ? width * 0.9 : width * 0.8 }}
          >
            {children}
          </View>
        </View>
      )}
    </NativeModal>
  ) : (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerModal}
        dismissable={true}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalContent}>{children}</View>
        </TouchableWithoutFeedback>
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
