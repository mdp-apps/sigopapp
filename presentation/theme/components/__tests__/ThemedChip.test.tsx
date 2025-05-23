import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedChip } from "../";

// Mockeamos los componentes de react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    Chip: jest.fn(({ children, icon, ...props }) => (
      <View {...props}>
        {icon ? icon() : null}
        <Text>{children}</Text>
      </View>
    )),
    Icon: jest.fn(() => <View testID="icon" />),
    withTheme: jest.fn(
      (Component) => (props: React.JSX.IntrinsicAttributes) =>
        <Component {...props} />
    ),
  };
});

describe("Probar <ThemedChip />", () => {
  const chipText = "Texto de prueba";

  test("Debe renderizar el texto correctamente", () => {
    render(<ThemedChip text={chipText} />);

    expect(screen.getByText(chipText)).toBeTruthy();
  });

  test("No debe renderizar el icono si no se proporciona `iconSource`", () => {
    const { queryByTestId } = render(<ThemedChip text="Chip" />);
    expect(queryByTestId("icon")).toBeNull();
  });

   test("Debe renderizar el icono si se proporciona `iconSource`", () => {
     const iconSource = "test-icon";

     render(<ThemedChip text="Chip" iconSource={iconSource} />);

     expect(screen.getByTestId("icon")).toBeTruthy();
   });
});
