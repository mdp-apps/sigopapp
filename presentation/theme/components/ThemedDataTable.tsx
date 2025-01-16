import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

export type Column<T> = { title: string; key: keyof T };

type SortDirection = "ascending" | "descending";

interface ThemedDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string | number;
  handleRowPress?: (item: T) => void;
  enablePagination?: boolean;
  itemsPerPageOptions?: number[];
}

export const ThemedDataTable = <T,>({
  data,
  columns,
  getRowKey,
  handleRowPress,
  enablePagination = false,
  itemsPerPageOptions = [5, 10, 15,20],
}: ThemedDataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("ascending");
   const [page, setPage] = useState(0);
   const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

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

  return (
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            {columns.map((column) => (
              <DataTable.Title
                key={column.key as string}
                sortDirection={
                  sortColumn === column.key ? sortDirection : undefined
                }
                onPress={() => handleSort(column.key)}
              >
                {column.title}
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {(enablePagination ? paginatedData : sortedData).map((item) => (
            <DataTable.Row
              key={getRowKey(item)}
              onPress={() => handleRowPress && handleRowPress(item)}
            >
              {columns.map((column) => (
                <DataTable.Cell key={column.key as string}>
                  {String(item[column.key])}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
        {enablePagination && (
          <DataTable.Pagination
            page={page}
            numberOfPages={numberOfPages}
            onPageChange={(page) => setPage(page)}
            label={label}
            numberOfItemsPerPageList={itemsPerPageOptions}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            selectPageDropdownLabel="Filas por página"
            showFastPaginationControls
          />
        )}
      </ScrollView>

  );
};

