import React, { useMemo, useState } from "react";
import { ScrollView, StyleProp, TextStyle, ViewStyle } from "react-native";

import { DataTable } from "react-native-paper";

import { useThemeColor } from "../hooks";
import { ThemedLoader, ThemedText, ThemedTooltip } from "./";

import { Formatter } from "@/config/helpers";

export type Column<T> = { title: string; key: keyof T };

type SortDirection = "ascending" | "descending";

interface TableStyle<T> {
  headerStyle?: StyleProp<ViewStyle>;
  cellStyle?: StyleProp<TextStyle>;
  columnCellStyle?: StyleProp<TextStyle>;
  rowStyle?:
    | StyleProp<ViewStyle>
    | ((item: T, index: number) => StyleProp<ViewStyle>);
}
interface ThemedDataTableProps<T> extends TableStyle<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string | number;
  isLoading?: boolean;
  handleRowPress?: (item: T) => void;
  textData?: string;
  enablePagination?: boolean;
  enableColumnTooltip?: boolean;
  itemsPerPageOptions?: number[];
  renderColAction?: () => React.ReactNode;
  renderActions?: (item: T) => React.ReactNode;
}

const initialPage = 0;
const initialItemsPerPage = 5;

export const ThemedDataTable = <T,>({
  data,
  columns,
  getRowKey,
  isLoading,
  handleRowPress,
  textData,
  enableColumnTooltip = false,
  enablePagination = false,
  itemsPerPageOptions = [5, 10, 15, 20],
  headerStyle,
  cellStyle,
  columnCellStyle,
  rowStyle,
  renderColAction,
  renderActions,
}: ThemedDataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("ascending");
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const backgroundColor = useThemeColor({}, "background");

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === "ascending" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const numberOfPages = Math.ceil(sortedData.length / itemsPerPage);
  const label = `Página ${page + 1} de ${numberOfPages}`;

  const paginatedData = useMemo(() => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, itemsPerPage]);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };

  const dataToRender = enablePagination ? paginatedData : sortedData;
  const showActions = typeof renderActions === "function";
  const showColAction = typeof renderColAction === "function";

  return (
    <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <DataTable.Header style={[headerStyle, { backgroundColor }]}>
        {columns.map((column) => {
          return (
            <DataTable.Title
              key={column.key as string}
              sortDirection={
                sortColumn === column.key ? sortDirection : undefined
              }
              onPress={() => handleSort(column.key)}
              style={{ justifyContent: "center"}}
            >
              {enableColumnTooltip ? (
                <ThemedTooltip title={column.title}>
                  <ThemedText style={columnCellStyle}>
                    {column.title}
                  </ThemedText>
                </ThemedTooltip>
              ) : (
                <ThemedText style={columnCellStyle}>{column.title}</ThemedText>
              )}
            </DataTable.Title>
          );
        })}

        {showColAction && <DataTable.Cell>{renderColAction()}</DataTable.Cell>}
      </DataTable.Header>
      <DataTable>
        {isLoading ? (
          <DataTable.Row style={{ margin: "auto" }}>
            <ThemedLoader color="gray" size="small" />
          </DataTable.Row>
        ) : dataToRender.length === 0 ? (
          <DataTable.Row>
            <DataTable.Cell
              textStyle={{ textAlign: "center", width: "100%", fontSize: 15 }}
            >
              {textData ?? "No hay datos para mostrar"}
            </DataTable.Cell>
          </DataTable.Row>
        ) : (
          dataToRender.map((item, index) => {
            const computedRowStyle =
              typeof rowStyle === "function" ? rowStyle(item, index) : rowStyle;

            return (
              <DataTable.Row
                key={getRowKey(item)}
                onPress={() => handleRowPress?.(item)}
                style={computedRowStyle}
              >
                {columns.map((column) => {
                  return (
                    <DataTable.Cell
                      key={String(column.key)}
                      style={{ flex: 2, justifyContent: "center" }}
                    >
                      <ThemedText
                        style={cellStyle}
                        adjustsFontSizeToFit={
                          String(item[column.key]).length <= 10
                        }
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {Formatter.truncateText(String(item[column.key]), 20)}
                      </ThemedText>
                    </DataTable.Cell>
                  );
                })}

                {showActions && (
                  <DataTable.Cell key="actions">
                    {renderActions?.(item)}
                  </DataTable.Cell>
                )}
              </DataTable.Row>
            );
          })
        )}
      </DataTable>

      {enablePagination && (
        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={(p) => setPage(p)}
          label={label}
          numberOfItemsPerPageList={itemsPerPageOptions}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          selectPageDropdownLabel="Filas por página"
          showFastPaginationControls
          style={{ backgroundColor }}
        />
      )}
    </ScrollView>
  );
};
