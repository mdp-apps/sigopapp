import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ThemedIconTooltip } from "../ThemedIconTooltip";

// Mock de ThemedTooltip
jest.mock("../ThemedTooltip", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    ThemedTooltip: jest.fn(({ children, title }) => (
      <View>
        {children}
        <Text>{title}</Text>
      </View>
    )),
  };
});

// Mock de ThemedButton
jest.mock("../ThemedButton", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    ThemedButton: jest.fn(
      ({ iconName, iconSize, iconColor, variant, ...props }) => (
        <View {...props}>
          {variant === "icon" && <Text testID="icon">{iconName}</Text>}
          {variant !== "icon" && <Text testID="button-text">Button</Text>}
        </View>
      )
    ),
  };
});

describe("Probar <ThemedIconTooltip />", () => {
  const tooltipTitle = "Tooltip title";
  const iconStyles = { name: "check-circle", color: "green", size: 24 };

  test("Debe renderizar el título del tooltip", () => {
    render(
      <ThemedIconTooltip tooltipTitle={tooltipTitle} iconStyles={iconStyles} />
    );

    expect(screen.getByText(tooltipTitle)).toBeTruthy();
  });

  test("Debe renderizar el icono correctamente", () => {
    render(
      <ThemedIconTooltip tooltipTitle={tooltipTitle} iconStyles={iconStyles} />
    );

    expect(screen.getByTestId("icon")).toHaveTextContent(iconStyles.name);
  });
});
