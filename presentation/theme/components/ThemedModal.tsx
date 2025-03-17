import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Modal as NativeModal,
  ModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { Modal, Portal } from "react-native-paper";

import { ThemedButton } from "./ThemedButton";

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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Animar aparición
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animar desaparición
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

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
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <ThemedButton
            style={styles.closeButton}
            onPress={hideModal}
            className="!p-0"
            variant="icon"
            iconName="close"
          />

          {children}
        </Animated.View>
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
  overlayContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    justifyContent: "center",
    width: width * 0.9,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
});
