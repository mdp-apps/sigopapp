export enum PermissionStatus {
  CHECKING = "checking",
  GRANTED = "granted",
  DENIED = "denied",
  BLOCKED = "blocked",
  LIMITED = "limited",
  UNAVAILABLE = "unavailable",
  UNDETERNAMINED = "undetermined",
}

export interface LatLng {
  latitude: number;
  longitude: number;
}
