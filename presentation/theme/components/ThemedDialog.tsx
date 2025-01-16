import Dialog from "react-native-dialog";
import { DialogInputProps } from "react-native-dialog/lib/Input";

interface ThemedDialogProps {
  isShowDialog: boolean;
  title: string;
  description: string;
  inputOptions?: DialogInputProps;
  handleDialogCancel?: () => void;
  handleDialogAccept?: () => void;
}

export const ThemedDialog = ({
  isShowDialog,
  title,
  description,
  inputOptions,
  handleDialogAccept,
  handleDialogCancel,
}: ThemedDialogProps) => {
  return (
    <Dialog.Container visible={isShowDialog}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>

      {inputOptions && (
        <Dialog.Input
          onChangeText={inputOptions.onChangeText}
          value={inputOptions.value}
          placeholder={inputOptions.placeholder}
          {...inputOptions}
        />
      )}

      {handleDialogCancel && (
        <Dialog.Button label="Cancelar" onPress={handleDialogCancel} />
      )}

      {handleDialogAccept && (
        <Dialog.Button label="Aceptar" onPress={handleDialogAccept} />
      )}
    </Dialog.Container>
  );
};

