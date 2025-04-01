import { CalcAdapter } from "../calc.adapter";

describe("Probar adaptador CalcAdapter", () => {
  describe("Probar calculateDistance()", () => {
    test("Debe calcular la distancia correcta entre dos coordenadas", () => {
      const baseLatitude = 40.7128; // Nueva York
      const baseLongitude = -74.006;
      const targetLatitude = 34.0522; // Los Ángeles
      const targetLongitude = -118.2437;

      const distance = CalcAdapter.calculateDistance(
        baseLatitude,
        baseLongitude,
        targetLatitude,
        targetLongitude
      );
      
      // Aproximadamente 3935 km entre NYC y LA
      expect(distance).toBeGreaterThan(3_900_000); // 3900 km
      expect(distance).toBeLessThan(4_000_000); // 4000 km
    });

    test("Debe retornar 0 si las coordenadas son iguales", () => {
      const latitude = 51.5074; // Londres
      const longitude = -0.1278;

      const distance = CalcAdapter.calculateDistance(
        latitude,
        longitude,
        latitude,
        longitude
      );

      expect(distance).toBe(0);
    });
  });

  describe("Probar getRandomNumber()", () => {
    test("Debe generar un número dentro del rango especificado", () => {
      const min = 10;
      const max = 20;

      for (let i = 0; i < 100; i++) {
        const randomNumber = CalcAdapter.getRandomNumber(min, max);
        
        expect(randomNumber).toBeGreaterThanOrEqual(min);
        expect(randomNumber).toBeLessThanOrEqual(max);
      }
    });
  });
});
