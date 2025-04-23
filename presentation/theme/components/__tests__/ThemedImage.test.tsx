import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ThemedImage } from "../";


describe("Probar <ThemedImage />", () => {
  test("Debe renderizar la imagen con las propiedades proporcionadas", () => {
    const url = "https://example.com/image.jpg";
    const width = 200;
    const height = 150;

    render(<ThemedImage url={url} width={width} height={height} />);
    
    const imageElement = screen.getByTestId("themed-image");
    expect(imageElement).toBeTruthy();
    
    expect(imageElement.props.source).toEqual({ uri: url });
    expect(imageElement.props.width).toEqual(width);
    expect(imageElement.props.height).toEqual(height);
  });
  
  test("Debe usar las dimensiones predeterminadas si no se proporcionan", () => {
    const url = "https://example.com/default-image.jpg";
    const defaultWidth = 300;
    const defaultHeight = 300;
    
    render(<ThemedImage url={url} />);

    const imageElement = screen.getByTestId("themed-image");
    expect(imageElement).toBeTruthy();

    expect(imageElement.props.width).toEqual(defaultWidth);
    expect(imageElement.props.height).toEqual(defaultHeight);
  });
});