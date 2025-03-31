import React from "react";
import { render, screen } from "@testing-library/react-native";

import { NoDataCard } from "../NoDataCard";
import { Colors } from "@/config/constants";



describe("Probar <NoDataCard />", () => {
  test("Debe renderizar correctamente con el mensaje proporcionado", () => {
    const message = "No hay datos disponibles";

    render(
      <NoDataCard
        message={message}
        iconSource="alert-circle"
      />
    );

    expect(screen.getByText(message)).toBeTruthy();
  });

  test("Debe renderizar el icono con el source correcto", () => {
    render(
      <NoDataCard message="Mensaje de prueba" iconSource="alert-circle" />
    );
    
    expect(screen.getByTestId("card-icon")).toBeTruthy();
  });
  
  test("Debe aplicar el tamaño y color del icono correctamente", () => {
    const iconSize = 100;
    const iconColor = Colors.light.primary;
    render(
      <NoDataCard
      message="Mensaje de prueba"
      iconSource="alert-circle"
      iconSize={iconSize}
      iconColor={iconColor}
      />
    );

    const icon = screen.getByTestId("card-icon");
    const iconProps = icon._fiber.child.pendingProps;

    expect(iconProps.size).toBe(iconSize);
    expect(iconProps.color).toBe(iconColor);
  });
});
