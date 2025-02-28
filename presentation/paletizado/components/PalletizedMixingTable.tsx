import { useState } from "react";
import { Checkbox } from "react-native-paper";

import { useThemeColor } from "@/presentation/theme/hooks";
import { ThemedDataTable } from "@/presentation/theme/components";

import { MIXES_REQ_COLUMNS } from "@/config/constants";

 const data = [
   { id: 1, batch: 1, mixCode: "MIX-001", totalMixWeight: 100 },
   { id: 2, batch: 2, mixCode: "MIX-002", totalMixWeight: 200 },
   { id: 3, batch: 3, mixCode: "MIX-003", totalMixWeight: 300 },
 ];

export const PalletizedMixingTable = () => {
  const primaryColor = useThemeColor({}, "primary");
  const grayColor = useThemeColor({}, "gray");
  const grayDarkColor = useThemeColor({}, "darkGray");
  const textColor = useThemeColor({}, "text");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleToggleRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = (allSelected: boolean) => {
    setSelectAll(allSelected);
    if (allSelected) {
      setSelectedIds(data.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <ThemedDataTable<any>
      data={data}
      columns={MIXES_REQ_COLUMNS}
      getRowKey={(item) => item.id}
      headerStyle={{
        borderBottomColor: grayColor,
        marginBottom: 10,
      }}
      columnCellStyle={{
        fontWeight: "700",
        color: grayDarkColor,
        textTransform: "uppercase",
      }}
      rowStyle={{ borderBottomColor: grayColor }}
      cellStyle={{ fontWeight: "400", color: textColor }}
      renderColAction={() => (
        <Checkbox
          status={selectAll ? "checked" : "unchecked"}
          onPress={() => handleToggleAll(!selectAll)}
          color={primaryColor}
        />
      )}
      renderActions={(row) => (
        <Checkbox
          status={selectedIds.includes(row.id) ? "checked" : "unchecked"}
          onPress={() => handleToggleRow(row.id)}
          color={primaryColor}
        />
      )}
    />
  );
};
