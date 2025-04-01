export class CalcAdapter {
  static calculateDistance = (
    baseLatitude: number,
    baseLongitude: number,
    targetLatitude: number,
    targetLongitude: number
  ): number => {
    const EARTH_RADIUS_METERS = 6371e3;
    const baseLatitudeRadians = (baseLatitude * Math.PI) / 180;
    const targetLatitudeRadians = (targetLatitude * Math.PI) / 180;
    const latitudeDifferenceRadians =
      ((targetLatitude - baseLatitude) * Math.PI) / 180;
    const longitudeDifferenceRadians =
      ((baseLongitude - targetLongitude) * Math.PI) / 180;

    const haversineFormula =
      Math.sin(latitudeDifferenceRadians / 2) *
        Math.sin(latitudeDifferenceRadians / 2) +
      Math.cos(baseLatitudeRadians) *
        Math.cos(targetLatitudeRadians) *
        Math.sin(longitudeDifferenceRadians / 2) *
        Math.sin(longitudeDifferenceRadians / 2);

    const centralAngle =
      2 *
      Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));

    const distance = EARTH_RADIUS_METERS * centralAngle;

    return distance;
  };

  static getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}
