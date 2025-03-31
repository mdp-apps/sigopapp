import React from "react";
import { Text } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { ThemedTabs } from "../ThemedTabs";

jest.mock("react-native-paper-tabs", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  return {
    TabsProvider: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    Tabs: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    TabScreen: ({
      label,
      children,
    }: {
      label: string;
      children: React.ReactNode;
    }) => (
      <View>
        <TouchableOpacity testID={`tab-${label}`}>
          <Text>{label}</Text>
        </TouchableOpacity>
        <View testID={`tab-content-${label}`}>{children}</View>
      </View>
    ),
  };
});

describe("Probar <ThemedTabs />", () => {
  const mockTabs = [
    {
      label: "Tab 1",
      component: <Text testID="content-tab1">Contenido Tab 1</Text>,
    },
    {
      label: "Tab 2",
      component: <Text testID="content-tab2">Contenido Tab 2</Text>,
    },
  ];

  test("Debe renderizar las pestañas correctamente", () => {
    render(<ThemedTabs tabs={mockTabs} />);
    
    expect(screen.getByText(mockTabs.at(0)?.label!)).toBeTruthy();
    expect(screen.getByText(mockTabs.at(1)?.label!)).toBeTruthy();
  });
  
  test("Debe mostrar el contenido del primer tab por defecto", () => {
    render(<ThemedTabs tabs={mockTabs} />);
    
    expect(screen.getByTestId("content-tab1")).toBeTruthy();
  });
  
  test("Debe cambiar de tab al presionar", () => {
    render(<ThemedTabs tabs={mockTabs} />);

    fireEvent.press(screen.getByTestId("tab-Tab 2"));

    expect(screen.getByTestId("content-tab2")).toBeTruthy();
  });
});
