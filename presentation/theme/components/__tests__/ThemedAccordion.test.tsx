import React from "react";
import { Text } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { ThemedAccordion } from "../ThemedAccordion";

describe("Probar <ThemedAccordion>", () => {
  const title = "Lote 1";
  const description = "QROPMIX ACTI3 NPK (05-33-12) 25 KG";

  test("Debe renderizar el titulo y la descripción correctamente", () => {
    render(
      <ThemedAccordion title={title} description={description}>
        <></>
      </ThemedAccordion>
    );

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(description)).toBeTruthy();
  });


  test("Debe renderizar children dentro del acordeon", () => {
    const contentText = "Accordion Content";

    render(
      <ThemedAccordion title={title}>
        <Text testID="accordion-content">{contentText}</Text>
      </ThemedAccordion>
    );
    const titleElement = screen.getByText(title);
    fireEvent.press(titleElement);

    expect(screen.getByTestId("accordion-content")).toBeTruthy();
    expect(screen.getByText(contentText)).toBeTruthy();
  });

  test.skip("Debe renderizar el ícono izquierdo si se proporciona la prop leftIcon", () => {
    const leftIcon = { icon: "account", color: "blue" };

    render(
      <ThemedAccordion title={title} leftIcon={leftIcon}>
        <></>
      </ThemedAccordion>
    );
    screen.debug();

    const leftIconElement = screen.queryByTestId("accordion-left-icon");
    expect(leftIconElement).toBeTruthy();
  });
});
