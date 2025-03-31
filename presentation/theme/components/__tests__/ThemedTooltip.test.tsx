import React from "react";
import { Text } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { ThemedTooltip } from "../ThemedTooltip";

describe("Probar <ThemedTooltip />", () => {
  const tooltipTitle = "Tooltip de prueba";

  test("Debe renderizar el contenido hijo correctamente", () => {
    render(
      <ThemedTooltip title={tooltipTitle}>
        <Text>Elemento con tooltip</Text>
      </ThemedTooltip>
    );
    
    expect(screen.getByText("Elemento con tooltip")).toBeTruthy();
  });
  
  test("No debe mostrar el tooltip inicialmente", () => {
    render(
      <ThemedTooltip title={tooltipTitle}>
        <Text>Elemento con tooltip</Text>
      </ThemedTooltip>
    );
    
    expect(screen.queryByText(tooltipTitle)).toBeNull();
  });
});
