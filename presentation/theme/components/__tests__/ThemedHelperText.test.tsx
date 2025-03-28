import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemedHelperText } from "../";

// Mockeamos los componentes de react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    HelperText: jest.fn(({ children, visible, ...props }) =>
      visible ? (
        <View {...props} testID="helper-text">
          <Text>{children}</Text>
        </View>
      ) : null
    ),
  };
});

jest.mock("react-native-paper-tabs", () => {
  return {
    Tabs: jest.fn(),
    TabScreen: jest.fn(),
    TabsProvider: jest.fn(),
  };
});

describe("Probar <ThemedHelperText />", () => {
  const helperText = "Este es un mensaje de error";

  test("Debe mostrar el texto cuando isVisible es true", () => {
    render(<ThemedHelperText isVisible={true}>{helperText}</ThemedHelperText>);

    expect(screen.getByText(helperText)).toBeTruthy();
  });

  test("No debe mostrar el texto cuando isVisible es false", () => {
    render(<ThemedHelperText isVisible={false}>{helperText}</ThemedHelperText>);

    expect(screen.queryByText(helperText)).toBeNull();
  });

  test("Debe aplicar el tipo 'error' por defecto", () => {
    render(<ThemedHelperText isVisible={true}>{helperText}</ThemedHelperText>);

    const helperTextComponent = screen.getByTestId("helper-text");
    expect(helperTextComponent.props.type).toBe("error");
  });

  test("Debe aplicar el tipo 'info' si se proporciona", () => {
    render(
      <ThemedHelperText isVisible={true} type="info">
        {helperText}
      </ThemedHelperText>
    );

    const helperTextComponent = screen.getByTestId("helper-text");
    expect(helperTextComponent.props.type).toBe("info");
  });
});
