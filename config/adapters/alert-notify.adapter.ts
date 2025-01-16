import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  IConfigDialog,
} from "react-native-alert-notification";

export default AlertNotificationRoot;

export const AlertType = ALERT_TYPE;

export class AlertNotifyAdapter {
  static show(options: IConfigDialog): void {
    Dialog.show(options);
  }
}
