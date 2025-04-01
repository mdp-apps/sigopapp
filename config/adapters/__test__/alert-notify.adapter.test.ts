import { AlertNotifyAdapter, AlertType } from "../alert-notify.adapter";

import { Dialog } from "react-native-alert-notification";

jest.mock("react-native-alert-notification", () => ({
  ALERT_TYPE: {
    SUCCESS: "SUCCESS",
    DANGER: "DANGER",
    WARNING: "WARNING",
    INFO: "INFO",
  },
  Dialog: {
    show: jest.fn(),
  },
  AlertNotificationRoot: jest.fn(({ children }) => children),
}));

describe("Probar adaptador AlertNotifyAdapter", () => {
  test("Debe llamar a Dialog.show() con los parámetros correctos", () => {
    const mockOptions = {
      type: AlertType.SUCCESS,
      title: "Éxito",
      textBody: "Operación completada correctamente.",
      button: "Cerrar",
    };

    AlertNotifyAdapter.show(mockOptions);

    expect(Dialog.show).toHaveBeenCalledWith(mockOptions);
    expect(Dialog.show).toHaveBeenCalledTimes(1);
  });
});
