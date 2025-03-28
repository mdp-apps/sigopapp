import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { ThemedDropdown } from "../ThemedDropdown";

type DropdownItem = {
  code: React.Key | null | undefined;
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
};

// 🔹 Mock de `react-native-element-dropdown`
jest.mock("react-native-element-dropdown", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  return {
    Dropdown: jest.fn(({ data, value, onChange, renderItem }) => (
      <View>
        <Text testID="dropdown-selected">{value}</Text>
        {data.map((item: DropdownItem) => (
          <TouchableOpacity key={item.code} onPress={() => onChange(item)}>
            {renderItem ? renderItem(item) : <Text>{item.name}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    )),
  };
});

// 🔹 Mock de `react-native-paper`
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

describe("Probar <ThemedDropdown/>", () => {
  const mockData = [
    { code: "1", name: "Opción 1" },
    { code: "2", name: "Opción 2" },
  ];

  test("Debe renderizar el indicador de carga cuando `isLoading` es verdadero", () => {
    render(<ThemedDropdown data={mockData} isLoading={true} />);

    const loader = screen.getByTestId("loader");

    expect(loader).toBeTruthy();
    expect(loader.props.children).toBe("Cargando...");
  });

  test("Debe renderizar la lista de opciones cuando `isLoading` es falso", () => {
    render(<ThemedDropdown data={mockData} isLoading={false} />);

    expect(screen.getByText(mockData.at(0)?.name!)).toBeTruthy();
    expect(screen.getByText(mockData.at(1)?.name!)).toBeTruthy();
  });

  test("Debe mostrar el valor seleccionado si se proporciona una opción preseleccionada", () => {
    const defaultSelected = "1";

    render(
      <ThemedDropdown
        data={mockData}
        isLoading={false}
        selected={defaultSelected}
      />
    );

    expect(screen.getByTestId("dropdown-selected").children[0]).toBe(
      defaultSelected
    );
  });

  test("Debe llamar a la función `onChange` cuando se selecciona una opción", () => {
    const mockOnChange = jest.fn();

    render(
      <ThemedDropdown
        data={mockData}
        isLoading={false}
        onChange={mockOnChange}
      />
    );
    
    fireEvent.press(screen.getByText("Opción 2"));
    
    expect(mockOnChange).toHaveBeenCalledWith("2");
  });

  test("No debe renderizar opciones si la lista de `data` está vacía", () => {
    render(
      <ThemedDropdown data={[]} isLoading={false} />
    );
    
    expect(screen.queryByText(mockData.at(0)?.name!)).toBeNull();
    expect(screen.queryByText(mockData.at(1)?.name!)).toBeNull();
  });
});
