import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedLoader } from "../ThemedLoader";

// Mockeamos los componentes de react-native-paper
jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    ActivityIndicator: jest.fn(({ color, size, ...props }) => (
      <View testID="activity-indicator" {...props}>
        <View testID="indicator-color" style={{ backgroundColor: color }} />
        <View testID="indicator-size" size={size} />
      </View>
    )),
  };
});

jest.mock("../ThemedView", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    ThemedView: jest.fn(({ children, ...props }) => (
      <View testID="themed-view" {...props}>
        {children}
      </View>
    )),
  };
});

describe("Probar <ThemedLoader />", () => {
  test("Debe renderizar el loader con el color y tamaño proporcionados", () => {
    const color = "blue";
    const size = "large";

    render(<ThemedLoader color={color} size={size} />);

    const themedView = screen.getByTestId("themed-view");
    const activityIndicator = screen.getByTestId("activity-indicator");
    const indicatorColor = screen.getByTestId("indicator-color");
    const indicatorSize = screen.getByTestId("indicator-size");

    expect(themedView).toBeTruthy();
    expect(activityIndicator).toBeTruthy();
    expect(indicatorColor.props.style.backgroundColor).toBe(color);
    expect(indicatorSize.props.size).toBe(size);
  });

  test("Debe renderizar el loader con el tamaño predeterminado si no se proporciona", () => {
    const color = "red";

    render(<ThemedLoader color={color} />);

    const indicatorSize = screen.getByTestId("indicator-size");
    expect(indicatorSize.props.size).toBeUndefined();
  });
});
