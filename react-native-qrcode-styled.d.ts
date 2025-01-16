declare module "react-native-qrcode-styled" {
  import { ComponentType } from "react";

  type EyeOptions = {
    scale?: PathProps["scale"]; // scaleXY | [scaleX, scaleY]
    rotation?: string | number;
    borderRadius?: number | number[];
    color?: ColorValue;
    gradient?: GradientProps;
    stroke?: ColorValue;
    strokeWidth?: number;
  };

  type EyePosition = "topLeft" | "topRight" | "bottomLeft";

  type AllEyesOptions = { [K in EyePosition]?: EyeOptions };

  type LogoArea = {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  type LogoOptions = {
    hidePieces?: boolean;
    padding?: number;
    scale?: number;
    onChange?: (logoArea?: LogoArea) => void;
  } & SVGImageProps;

  interface QRCodeStyledProps {
    data: string;
    pieceSize?: number;
    padding?: number;
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    color?: ColorValue;
    outerEyesOptions?: EyeOptions | AllEyesOptions;
    innerEyesOptions?: EyeOptions | AllEyesOptions;
    logo?: LogoOptions;
  }

  const QRCodeStyled: ComponentType<QRCodeStyledProps>;

  export default QRCodeStyled;
}
