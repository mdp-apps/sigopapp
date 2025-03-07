import { REGEX } from "../constants";

export class Formatter {
  static capitalize(text: string): string {
    if (!text) return text;

    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
  }

  static formatRut(text: string): string {
    const cleanedInput = text.replace(REGEX.cleanRut, "");

    if (cleanedInput.length <= 1) {
      return cleanedInput;
    }

    const rutPart = cleanedInput.slice(0, -1);
    const dv = cleanedInput.slice(-1).toLocaleUpperCase();

    let formattedRut = rutPart.replace(REGEX.dotsInRut, ".");

    return `${formattedRut}-${dv}`;
  }

  static initialLetter(text: string): string {
    if (!text) return text;

    return `${text.charAt(0).toLocaleUpperCase()}.`;
  }

  static numberWithDots(number: number): string {
    if (!number) return "0";

    return number.toLocaleString("de-DE");
  }

  static truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
}
