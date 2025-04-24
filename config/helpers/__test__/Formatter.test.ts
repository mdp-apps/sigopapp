import { Formatter } from "../Formatter";

describe("Probar Formatter", () => {
  describe("capitalize", () => {
    test("Debe capitalizar la primera letra del texto", () => {
      expect(Formatter.capitalize("texto")).toBe("Texto");
      expect(Formatter.capitalize("Texto")).toBe("Texto");
    });

    test("Debe devolver el texto vacío si no hay texto", () => {
      expect(Formatter.capitalize("")).toBe("");
      expect(Formatter.capitalize(null as unknown as string)).toBe(null);
    });
  });

  describe("rutWithDots", () => {
    test("Debe formatear un RUT con puntos y guión", () => {
      expect(Formatter.rutWithDots("12345678k")).toBe("12.345.678-K");
      expect(Formatter.rutWithDots("12345678K")).toBe("12.345.678-K");
    });

    test("Debe manejar RUTs cortos o vacíos", () => {
      expect(Formatter.rutWithDots("1k")).toBe("1-K");
      expect(Formatter.rutWithDots("")).toBe("");
    });
  });

  describe("rutWithoutDots", () => {
    test("Debe formatear un RUT sin puntos pero con guión", () => {
      expect(Formatter.rutWithoutDots("12345678k")).toBe("12345678-K");
      expect(Formatter.rutWithoutDots("12345678K")).toBe("12345678-K");
    });

    test("Debe manejar RUTs cortos o vacíos", () => {
      expect(Formatter.rutWithoutDots("1k")).toBe("1-K");
      expect(Formatter.rutWithoutDots("")).toBe("");
    });

    test("Debe devolver el texto original si tiene longitud 1", () => {
      expect(Formatter.rutWithoutDots("1")).toBe("1");
    });

    test("Debe manejar valores nulos", () => {
      expect(Formatter.rutWithoutDots(null as unknown as string)).toBe(null);
    });
  });

  describe("initialLetter", () => {
    test("Debe devolver la primera letra en mayúscula seguida de un punto", () => {
      expect(Formatter.initialLetter("texto")).toBe("T.");
      expect(Formatter.initialLetter("Texto")).toBe("T.");
    });

    test("Debe manejar texto vacío o nulo", () => {
      expect(Formatter.initialLetter("")).toBe("");
      expect(Formatter.initialLetter(null as unknown as string)).toBe(null);
    });
  });

  describe("numberWithDots", () => {
    test("Debe formatear un número con puntos como separadores de miles", () => {
      expect(Formatter.numberWithDots(1234567)).toBe("1.234.567");
      expect(Formatter.numberWithDots(0)).toBe("0");
    });

    test("Debe manejar valores nulos", () => {
      expect(Formatter.numberWithDots(null as unknown as number)).toBe("0");
    });
  });

  describe("truncateText", () => {
    test("Debe truncar el texto si excede la longitud máxima", () => {
      expect(Formatter.truncateText("Este es un texto largo", 10)).toBe(
        "Este es un..."
      );
    });

    test("Debe devolver el texto completo si no excede la longitud máxima", () => {
      expect(Formatter.truncateText("Texto corto", 20)).toBe("Texto corto");
    });

    test("Debe manejar texto vacío", () => {
      expect(Formatter.truncateText("", 10)).toBe("");
    });
  });
});
