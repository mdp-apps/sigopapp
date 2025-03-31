import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";

import { ScrollFilters } from "../ScrollFilters";

describe("Probar <ScrollFilters />", () => {
  const textFilter1 = "Filtro 1";
  const textFilter2 = "Filtro 2";

  test("Debe renderizar correctamente los elementos hijos", () => {
    render(
      <ScrollFilters>
        <Text testID="filter-1">{textFilter1}</Text>
        <Text testID="filter-2">{textFilter2}</Text>
      </ScrollFilters>
    );

    expect(screen.getByText(textFilter1)).toBeTruthy();
    expect(screen.getByText(textFilter2)).toBeTruthy();
  });

  test("Debe permitir el desplazamiento horizontal", () => {
   render(
      <ScrollFilters>
        <Text testID="filter-1">Filtro 1</Text>
      </ScrollFilters>
    );

    const scrollView = screen.getByTestId("scroll-filters");
    expect(scrollView.props.horizontal).toBe(true);
  });
});
