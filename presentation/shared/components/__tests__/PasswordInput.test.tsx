import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { PasswordInput } from "../PasswordInput";

import { FormProvider, useForm } from "react-hook-form";

const WrapperComponent = ({ placeholder }: { placeholder?: string }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <PasswordInput control={methods.control} placeholder={placeholder} />
    </FormProvider>
  );
};

describe("Probar <PasswordInput />", () => {
  test("Debe renderizar correctamente el input de contraseña", () => {
    const placeholder = "Ingrese su clave";
    render(<WrapperComponent placeholder={placeholder} />);
    
    expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
  });
  
  test("Debe cambiar el icono y mostrar la contraseña al presionar el botón", () => {
    
    render(<WrapperComponent />);
    
    const toggleButton = screen.getByTestId("toggle-visibility");
    const passwordInput = screen.getByPlaceholderText("Ingrese su contraseña");
    
    expect(passwordInput.props.secureTextEntry).toBe(true);
    
    fireEvent.press(toggleButton);

    expect(passwordInput.props.secureTextEntry).toBe(false);
  });
});
