import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import { ThemedMultiSelect } from "../ThemedMultiSelect";
import { DropdownItem } from "@/infrastructure/interfaces";

jest.mock("react-native-element-dropdown", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  return {
    MultiSelect: jest.fn(
      ({ data, value, onChange, renderItem, placeholder }) => (
        <View testID="multiselect">
          <Text testID="multiselect-placeholder">{placeholder}</Text>
          <Text testID="multiselect-selected">{value.join(", ")}</Text>

          {data.map((item: DropdownItem) => (
            <TouchableOpacity
              key={item.code}
              onPress={() => onChange([...value, item.code])}
            >
              {renderItem ? renderItem(item) : <Text>{item.name}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )
    ),
  };
});

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    ActivityIndicator: jest.fn(({ animating }) =>
      animating ? <Text testID="loader">Cargando...</Text> : null
    ),
    MD2Colors: {
      red800: "#B00020",
    },
  };
});

const mockOnChange = jest.fn();

const mockData = [
  { code: "1", name: "Opción 1" },
  { code: "2", name: "Opción 2" },
  { code: "3", name: "Opción 3" },
];

describe("Probar <ThemedMultiSelect />", () => {
  const placeholder = "Selecciona opciones";

  test("Debe mostrar el spinner cuando `isLoading` es `true`", () => {
    render(
      <ThemedMultiSelect
        data={mockData}
        isLoading={true}
        onChange={mockOnChange}
        selected={[]}
        placeholder={placeholder}
      />
    );

    expect(screen.getByTestId("loader")).toBeTruthy();
  });

  test("Debe renderizar el selector con opciones disponibles", () => {
    render(
      <ThemedMultiSelect
        data={mockData}
        isLoading={false}
        onChange={mockOnChange}
        selected={[]}
        placeholder={placeholder}
      />
    );

    expect(screen.getByText(placeholder)).toBeTruthy();

    fireEvent.press(screen.getByText(placeholder));

    expect(screen.getByText(mockData.at(0)?.name!)).toBeTruthy();
    expect(screen.getByText(mockData.at(1)?.name!)).toBeTruthy();
    expect(screen.getByText(mockData.at(2)?.name!)).toBeTruthy();
  });

  test("Debe permitir seleccionar elementos y llamar a `onChange`", () => {
    render(
      <ThemedMultiSelect
        data={mockData}
        isLoading={false}
        onChange={mockOnChange}
        selected={[]}
        placeholder={placeholder}
      />
    );

    fireEvent.press(screen.getByText(placeholder));

    fireEvent.press(screen.getByText("Opción 1"));

    expect(mockOnChange).toHaveBeenCalledWith(["1"]);
  });

  test("No debe renderizar opciones si la lista de `data` está vacía", () => {
    render(
      <ThemedMultiSelect
        data={[]}
        isLoading={false}
        onChange={mockOnChange}
        selected={[]}
        placeholder={placeholder}
      />
    );

    expect(screen.queryByText(mockData.at(0)?.name!)).toBeNull();
    expect(screen.queryByText(mockData.at(1)?.name!)).toBeNull();
  });
});
