import { DateAdapter } from "../date.adapter";

describe("Probar adaptador DateAdapter", () => {
  describe("Probar format()", () => {
    test("Debe formatear correctamente una fecha en español", () => {
      const date = new Date(2025, 3, 1); // 1 de abril de 2025
      const formattedDate = DateAdapter.format(date, "dd 'de' MMMM 'de' yyyy");
      
      expect(formattedDate).toBe("01 de abril de 2025");
    });
    
    test("Debe formatear una fecha en string correctamente", () => {
      const date = "2025-04-01T12:00:00Z";
      const formattedDate = DateAdapter.format(date, "dd/MM/yyyy");
      
      expect(formattedDate).toBe("01/04/2025");
    });
  });
  
  describe("Probar parseISO()", () => {
    test("Debe parsear correctamente una fecha en formato ISO", () => {
      let dateString = "2025-04-01";
      const parsedDate = DateAdapter.parseISO(dateString);

      expect(parsedDate).toBeInstanceOf(Date);
      expect(parsedDate.toISOString()).toContain(dateString);

      dateString = "2025-04-01T12:00:00Z";
      const parsedDateWithTime = DateAdapter.parseISO(dateString);

      expect(parsedDateWithTime).toBeInstanceOf(Date);
      expect(parsedDateWithTime.toISOString()).not.toContain(dateString);
    });
  });

  describe("Probar toDate()", () => {
    test("Debe convertir una fecha a la zona horaria de Chile", () => {
      const date = "2025-04-01T12:00:00Z";
      const convertedDate = DateAdapter.toDate(date);

      expect(convertedDate).toBeInstanceOf(Date);
      expect(convertedDate.getFullYear()).toBe(2025);
      
    });
  });
});
