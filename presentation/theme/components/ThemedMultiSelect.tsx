import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { DropdownResponse } from "@/infrastructure/interfaces";

import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

interface DropdownComponentProps {
  data: DropdownResponse[];
  isLoading: boolean;
  onChange: (item: string[]) => void;
  selected: string[];
  placeholder?: string;
}

export const ThemedMultiSelect = ({
  data,
  isLoading,
  onChange,
  selected,
  placeholder,
}: DropdownComponentProps) => {
  const [values, setValues] = useState<string[]>([]);	

  useEffect(() => {
    if (data.length > 0 && selected.length > 0) {
      setValues(selected);
    }
  }, [data, selected]);

  const renderItem = (item: DropdownResponse) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.name}</Text>
        {values.includes(item.code) && (
          <AntDesign style={styles.icon} color="black" name="check" size={20} />
        )}
      </View>
    );
  };
  if (isLoading) {
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />;
  }
  return (
    <>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="name"
        valueField="code"
        placeholder={placeholder}
        searchPlaceholder="Buscar..."
        value={values}
        onChange={(items) => {
          onChange(items);
          setValues(items);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="select1"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.name}</Text>
              <AntDesign color="black" name="close" size={17} />
            </View>
          </TouchableOpacity>
        )}
        selectedStyle={styles.selectedStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: "100%",
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
