import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { Filter } from "../Filter";

describe("Probar <Filter />", () => {
  const mockOnPress = jest.fn();
  const mockOnClear = jest.fn();
  const FILTER_LABELS = { status: "Estado" };

  const filterKeyMock = "status";
  let displayValueMock = "";

  test("Debe renderizar correctamente con las props adecuadas", () => {
    render(
      <Filter
        onPress={mockOnPress}
        onClear={mockOnClear}
        filterKey={filterKeyMock}
        displayValue={displayValueMock}
        filterLabels={FILTER_LABELS}
      />
    );

    expect(screen.getByText(FILTER_LABELS[filterKeyMock])).toBeTruthy();
  });

  test("Debe mostrar el texto correcto basado en `displayValue`", () => {
    displayValueMock = "Activo";

    render(
      <Filter
        onPress={mockOnPress}
        onClear={mockOnClear}
        filterKey={filterKeyMock}
        displayValue={displayValueMock}
        filterLabels={FILTER_LABELS}
      />
    );

    expect(
      screen.getByText(`${FILTER_LABELS[filterKeyMock]}: ${displayValueMock}`)
    ).toBeTruthy();
  });

  test("Debe invocar a `onPress` cuando se toca el botón principal", () => {
    displayValueMock = "";

    render(
      <Filter
        onPress={mockOnPress}
        onClear={mockOnClear}
        filterKey={filterKeyMock}
        displayValue={displayValueMock}
        filterLabels={FILTER_LABELS}
      />
    );

    fireEvent.press(screen.getByText(FILTER_LABELS[filterKeyMock]));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test("Debe invocar a `onClear` cuando hay `displayValue` y se toca el botón de limpiar", () => {
    displayValueMock = "Activo";

    render(
      <Filter
        onPress={mockOnPress}
        onClear={mockOnClear}
        filterKey={filterKeyMock}
        displayValue={displayValueMock}
        filterLabels={FILTER_LABELS}
      />
    );

    fireEvent.press(screen.getByTestId("clear-filter-button"));
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
