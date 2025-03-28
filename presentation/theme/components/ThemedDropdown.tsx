import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ThemedDropdownProps {
  data: DropdownResponse[];
  isLoading: boolean;
  selected?: string;
  onChange?: (item: string) => void;
  placeholder?: string;
}

export const ThemedDropdown = ({
  data,
  isLoading,
  onChange,
  selected,
  placeholder,
}: ThemedDropdownProps) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (data.length > 0 && selected) {
      setValue(selected);
    }
  }, [data, selected]);

  const renderItem = (item: DropdownResponse) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.code === value && (
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
      <Dropdown
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
        value={value}
        onChange={(item) => {
          setValue(item.code);
          onChange && onChange(item.code);
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
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
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
});
