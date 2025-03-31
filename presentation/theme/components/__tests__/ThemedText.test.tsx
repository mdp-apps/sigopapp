import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedText } from "../ThemedText";

describe("Probar <ThemedText />", () => {
  test("Debe renderizar el texto correctamente", () => {
    render(<ThemedText>Texto de prueba</ThemedText>);

    expect(screen.getByText("Texto de prueba")).toBeTruthy();
  });

  test("Debe aplicar la clase correcta para el variant 'h1'", () => {
    render(<ThemedText variant="h1">Encabezado</ThemedText>);

    expect(screen.getByText("Encabezado").props.className).toContain(
      "text-4xl"
    );
  });

  test("Debe aplicar la clase correcta para el variant 'bold'", () => {
    render(<ThemedText variant="bold">Negrita</ThemedText>);

    expect(screen.getByText("Negrita").props.className).toContain("font-bold");
  });

  test("Debe combinar className personalizada con variant", () => {
    render(
      <ThemedText variant="h3" className="text-red-500">
        Texto personalizado
      </ThemedText>
    );
    const textComponent = screen.getByText("Texto personalizado");

    expect(textComponent.props.className).toContain("text-2xl");
    expect(textComponent.props.className).toContain("text-red-500");
  });
});
