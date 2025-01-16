import React, { useEffect, useState } from "react";

import {
  Dimensions,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import {
  TextInput,
  ActivityIndicator,
  Button,
  Appbar,
  Snackbar,
} from "react-native-paper";

import { useNavigation } from "expo-router";

import { usePalletizedProduction } from "@/presentation/paletizado/hooks";

import { Req } from "@/infrastructure/entities";
import { StorageAdapter } from "@/config/adapters";

import Toggle from "react-native-toggle-element";

const screenWidth = Dimensions.get("window").width;

interface PalletsProps {
  visible?: boolean;
  selectedItem?: Req | null;
}

export const Pallets = ({ visible, selectedItem }: PalletsProps) => {
  const [title, setTitle] = useState("");

  const [tipoReq, setTipoReq] = useState("");
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const navigation = useNavigation();

  const { palletizedProduction, setPalletizedProduction, isLoadingPalletized } =
    usePalletizedProduction(selectedItem?.internalCode!);

  const onDismissSnackBar = () => setVisibleSnackbar(false);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const codigo_requerimiento = await StorageAdapter.getItem(
        "codigo_requerimiento"
      );

      const tipo_requerimiento = await StorageAdapter.getItem(
        "tipo_requerimiento"
      );

      setTipoReq(tipo_requerimiento!);

      if (codigo_requerimiento) {
        setTitle("Pallets de Req. " + codigo_requerimiento);
        navigation.setOptions({
          title: "Pallets de Req. " + codigo_requerimiento,
        });
      }
    };

    obtenerDatosUsuario();
  }, []);

  useEffect(() => {
    if (visible && selectedItem) {
      setTipoReq(`${selectedItem.reqType}${selectedItem.formatType}`);
    }
  }, [visible, selectedItem]);

  const handleBackAction = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackAction} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.centeredView}>
          {isLoadingPalletized && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}

          <Toggle
            value={palletizedProduction[0].hasPallet === 1}
            onPress={(newState) => {
              setPalletizedProduction([
                {
                  ...palletizedProduction[0],
                  hasPallet: newState ? 1 : 0,
                },
              ]);
            }}
            leftTitle="No tiene pallet"
            rightTitle="Tiene pallet"
            containerStyle={{ marginTop: 8, marginBottom: 8 }}
            trackBar={{
              width: screenWidth * 0.6,
              height: 50,
              radius: 25,
              inActiveBackgroundColor: "salmon",
              activeBackgroundColor: "#AAC1FE",
            }}
            thumbButton={{
              width: 100,
              height: 60,
              radius: 30,
              inActiveBackgroundColor: "red",
              activeBackgroundColor: "blue",
            }}
          />
          

          {palletizedProduction[0].hasPallet === 1 && (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              {tipoReq === "12" ? (
                <View>
                  <TextInput
                    keyboardType="numeric"
                    label="Núm. de Pallets (UN)"
                    mode="outlined"
                    activeOutlineColor="#0000ff"
                    outlineColor="#AAC1FE"
                    placeholder="Ingrese cant. de pallets"
                    style={styles.inputModal}
                    value={String(palletizedProduction[0].palletQuantity)}
                    onChangeText={(text) => {
                      setPalletizedProduction([
                        {
                          ...palletizedProduction[0],
                          palletQuantity: Number(text),
                        },
                      ]);
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    label="Peso total de Pallets (KG)"
                    mode="outlined"
                    activeOutlineColor="#0000ff"
                    outlineColor="#AAC1FE"
                    placeholder="Ingrese peso total de pallets"
                    style={styles.inputModal}
                    value={String(palletizedProduction[0].totalWeight)}
                    onChangeText={(text) => {
                      setPalletizedProduction([
                        {
                          ...palletizedProduction[0],
                          totalWeight: Number(text),
                        },
                      ]);
                    }}
                  />
                </View>
              ) : (
                <View>
                  <TextInput
                    keyboardType="numeric"
                    label="Núm. de Pallets (UN)"
                    mode="outlined"
                    activeOutlineColor="#0000ff"
                    outlineColor="#AAC1FE"
                    placeholder="Ingrese cant. de pallets"
                    style={[styles.inputModal, { marginTop: 8 }]}
                    value={String(palletizedProduction[0].palletQuantity)}
                    onChangeText={(text) => {
                      setPalletizedProduction([
                        {
                          ...palletizedProduction[0],
                          palletQuantity: Number(text),
                        },
                      ]);
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    label="Peso total de Pallets (KG)"
                    mode="outlined"
                    activeOutlineColor="#0000ff"
                    outlineColor="#AAC1FE"
                    placeholder="Ingrese peso total de pallets"
                    style={styles.inputModal}
                    value={String(palletizedProduction[0].totalWeight)}
                    onChangeText={(text) => {
                      setPalletizedProduction([
                        {
                          ...palletizedProduction[0],
                          totalWeight: Number(text),
                        },
                      ]);
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    label="Cant. Mezcla Palletizada (KG)"
                    mode="outlined"
                    activeOutlineColor="#0000ff"
                    outlineColor="#AAC1FE"
                    placeholder="Ingrese cant. de mezcla palletizada"
                    style={styles.inputModal}
                    value={String(palletizedProduction[0].mixQuantity)}
                    onChangeText={(text) => {
                      setPalletizedProduction([
                        {
                          ...palletizedProduction[0],
                          mixQuantity: Number(text),
                        },
                      ]);
                    }}
                  />
                </View>
              )}
            </TouchableWithoutFeedback>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => ""}
          style={{ marginRight: 12, backgroundColor: "#0000ff" }}
        >
          Guardar cambios
        </Button>
        <Button
          mode="contained"
          onPress={() => {}}
          style={{ backgroundColor: "salmon" }}
        >
          Limpiar
        </Button>
      </View>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={onDismissSnackBar}
        action={{ label: "OK", onPress: () => {} }}
      >
        Debe completar los datos solicitados
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "rgba(255,255, 255, 0.3)",
  },
  inputModal: {
    width: screenWidth * 0.6,
    height: 50,
    fontSize: 14,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
});
