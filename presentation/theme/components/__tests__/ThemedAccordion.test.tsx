import React from "react";
import { Text } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { ThemedAccordion } from "../ThemedAccordion";

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    List: {
      Accordion: jest.fn(({ children, title, description,right, left, ...props }) => (
        <View {...props}>
          {right && right({})}
          {left && left({})}
          <Text>{title}</Text>
          {description && <Text>{description}</Text>}
          {children}
        </View>
      )),
      Icon: jest.fn(({ testID, icon, color }) => (
        <View testID={testID} icon={icon} color={color} />
      )),
    },
    Card: jest.fn(({ children }) => <View>{children}</View>),
  };
});

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

  test("Debe renderizar el ícono derecho correctamente", () => {
    render(
      <ThemedAccordion title={title}>
        <></>
      </ThemedAccordion>
    );

    const rightIconElement = screen.getByTestId("accordion-right-icon");
    expect(rightIconElement).toBeTruthy();
    expect(rightIconElement.props.icon).toBe("chevron-down");

    const titleElement = screen.getByText(title);
    fireEvent.press(titleElement);

    expect(rightIconElement.props.icon).toBe("chevron-up");
  });

  test("Debe renderizar el ícono izquierdo si se proporciona la prop leftIcon", () => {
    const leftIcon = { icon: "account", color: "blue" };

    render(
      <ThemedAccordion title={title} leftIcon={leftIcon}>
        <></>
      </ThemedAccordion>
    );

    const leftIconElement = screen.getByTestId("accordion-left-icon");
    expect(leftIconElement).toBeTruthy();
    expect(leftIconElement.props.icon).toBe(leftIcon.icon);
    expect(leftIconElement.props.color).toBe(leftIcon.color);
  });
});
