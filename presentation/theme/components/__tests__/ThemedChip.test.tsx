
import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedChip } from "../";;


describe("Probar <ThemedChip />", () => {
  const chipText = "Texto de prueba";

  test("Debe renderizar el texto correctamente", () => {
    render(<ThemedChip text={chipText} />);

    expect(screen.getByText(chipText)).toBeTruthy();
  });
});
