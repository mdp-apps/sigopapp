import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// Desactiva el temporizador automático de Jest
jest.useFakeTimers();

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn().mockReturnValue(true),
}));


jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: jest.fn(() => null),
}));

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  return {
    ...jest.requireActual("react-native-safe-area-context"),
    SafeAreaProvider: ({ children }) => (
      <>{children}</>
    ),
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  };
});


