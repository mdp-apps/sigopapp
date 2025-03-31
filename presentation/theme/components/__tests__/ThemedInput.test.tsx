import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { ThemedInput } from "../ThemedInput";

describe("Probar <ThemedInput />", () => {
  const placeholderText = "Ingrese algo";
  const testValue = "Prueba de texto";

  test("Debe renderizar correctamente el valor proporcionado", () => {
    render(<ThemedInput value={testValue} placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toHaveProp(
      "value",
      testValue
    );
  });

  test("Debe aplicar el placeholder correctamente", () => {
    render(<ThemedInput value={testValue} placeholder={placeholderText} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeTruthy();
  });

  test("Debe ejecutar onChangeText cuando el texto cambie", () => {
    const mockOnChangeText = jest.fn();

    const newText = "Texto de prueba";

    render(
      <ThemedInput
        value={testValue}
        placeholder={placeholderText}
        onChangeText={mockOnChangeText}
      />
    );

    fireEvent.changeText(screen.getByPlaceholderText(placeholderText), newText);
    expect(mockOnChangeText).toHaveBeenCalledWith(newText);
  });

  test("Debe ejecutar onBlur cuando el input pierda el foco", () => {
    const mockOnBlur = jest.fn();

    render(
      <ThemedInput
        value={testValue}
        placeholder={placeholderText}
        onBlur={mockOnBlur}
      />
    );
    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent(input, "blur");
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("Debe ejecutar onSubmitEditing cuando se presione 'enter'", () => {
    const mockOnSubmitEditing = jest.fn();
    render(
      <ThemedInput
        value={testValue}
        placeholder={placeholderText}
        onSubmitEditing={mockOnSubmitEditing}
      />
    );
    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent(input, "submitEditing");
    expect(mockOnSubmitEditing).toHaveBeenCalled();
  });

  test("Debe renderizar correctamente el color de contorno", () => {
    const activeOutlineColor = "red";
    const outlineColor = "blue";
    render(
      <ThemedInput
        value={testValue}
        placeholder={placeholderText}
        activeOutlineColor={activeOutlineColor}
        outlineColor={outlineColor}
      />
    );

    const input = screen.getByPlaceholderText(placeholderText);
    const activeOutlineColorProp =
      input._fiber.return.stateNode.props.selectionColor;

    expect(activeOutlineColorProp).toBe(activeOutlineColor);
  });

  test("Debe mostrar un icono derecho si se pasa la propiedad iconRight", () => {
    const iconRightProps = {
      icon: "check-circle",
      color: "green",
      onPress: jest.fn(),
    };

    const iconTestIdPaper = "right-icon-adornment";

    render(
      <ThemedInput
        value={testValue}
        placeholder={placeholderText}
        iconRight={iconRightProps}
      />
    );
    const icon = screen.getByTestId(iconTestIdPaper);

    expect(icon).toBeTruthy();
    fireEvent.press(icon);
    expect(iconRightProps.onPress).toHaveBeenCalled();
  });

  test("Debe usar <NativeTextInput/> cuando isNative es verdadero", () => {
    render(
      <ThemedInput value={testValue} placeholder={placeholderText} isNative />
    );
    const nativeInput = screen.getByPlaceholderText(placeholderText);

    expect(nativeInput).toBeTruthy();
    expect(nativeInput).toHaveStyle({ height: 40 });
  });
});
