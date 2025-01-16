import { Column } from "@/presentation/theme/components";
import { LogStatusReq, Stock } from "@/infrastructure/entities";

export const LOG_STATUS_REQ_COLUMNS: Column<LogStatusReq>[] = [
  { title: "Estado", key: "reqStatusName" },
  { title: "Descripción", key: "description" },
  { title: "Fecha", key: "eventDate" },
];

export const CURRENT_STOCK_COLUMNS: Column<Stock>[] = [
  { title: "Cli.", key: "customerName" },
  { title: "Prod.", key: "productName" },
  { title: " Cód. Ope.", key: "operationCode" },
  { title: " Nom. Ope.", key: "operationName" },
  { title: " Bod.", key: "warehouseAbbr" },
  { title: "Cant. KG.", key: "quantity" },
];
