import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { FilterModal } from "../FilterModal";
import { PaperProvider } from "react-native-paper";

describe("Probar <FilterModal />", () => {
  const mockHandleClose = jest.fn();
  const buttonTextFilter = "Aplicar filtro";

  test("Debe renderizar correctamente cuando el modal está visible", () => {
    render(
      <FilterModal isModalVisible={true} handleCloseModal={mockHandleClose}>
        <></>
      </FilterModal>,
      {
        wrapper: PaperProvider,
      }
    );

    expect(screen.getByText(buttonTextFilter)).toBeTruthy();
  });

  test("No se debe mostrar cuando `isModalVisible` es `false`", () => {
    render(
      <FilterModal isModalVisible={false} handleCloseModal={mockHandleClose}>
        <></>
      </FilterModal>,
      {
        wrapper: PaperProvider,
      }
    );

    expect(screen.queryByText(buttonTextFilter)).toBeNull();
  });

  test("Debe invocar a `handleCloseModal` cuando se presiona el botón", () => {
    render(
      <FilterModal isModalVisible={true} handleCloseModal={mockHandleClose}>
        <></>
      </FilterModal>,
      {
        wrapper: PaperProvider,
      }
    );

    fireEvent.press(screen.getByText(buttonTextFilter));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
