import React from "react";
import { Text } from "react-native";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { ThemedModal } from "../ThemedModal";

import { SafeAreaProvider } from "react-native-safe-area-context";

jest.mock("react-native-paper", () => {
  const actualPaper = jest.requireActual("react-native-paper");
  return {
    ...actualPaper,
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("Probar <ThemedModal />", () => {
  const hideModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe renderizar el modal nativo cuando `isNativeModal` es `true`", () => {
    render(
      <ThemedModal isVisible={true} hideModal={hideModalMock} isNativeModal>
        <Text testID="modal-content">Contenido del modal</Text>
      </ThemedModal>
    );

    expect(screen.getByTestId("modal-content")).toBeTruthy();
  });
});
