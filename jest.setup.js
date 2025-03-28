// Desactiva el temporizador automático de Jest
jest.useFakeTimers();

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn().mockReturnValue(true),
}));


jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: jest.fn(() => null),
}));


