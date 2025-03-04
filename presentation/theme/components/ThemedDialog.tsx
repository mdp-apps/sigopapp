import React from "react";
import Dialog from "react-native-dialog";
import { DialogInputProps } from "react-native-dialog/lib/Input";
import { Control, Controller } from "react-hook-form";

interface DialogInput extends DialogInputProps {
  control: Control<any>;
}

interface ThemedDialogProps {
  isShowDialog: boolean;
  title: string;
  description: string;
  inputOptions?: DialogInput;
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
        <Controller
          control={inputOptions.control}
          name="rut"
          render={({ field: { onChange, onBlur, value } }) => (
            <Dialog.Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={inputOptions.placeholder}
              {...inputOptions}
            />
          )}
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
