import { Column } from "@/presentation/theme/components";
import { LogStatusReq, ObservationReq, PalletizingMix, Stock } from "@/infrastructure/entities";


export const CURRENT_STOCK_COLUMNS: Column<Stock>[] = [
  { title: "Cli.", key: "customerName" },
  { title: "Prod.", key: "productName" },
  { title: " Cód. Ope.", key: "operationCode" },
  { title: " Nom. Ope.", key: "operationName" },
  { title: " Bod.", key: "warehouseAbbr" },
  { title: "Cant. KG.", key: "quantity" },
];

export const LOG_STATUS_REQ_COLUMNS: Column<LogStatusReq>[] = [
  { title: "Estado", key: "reqStatusName" },
  { title: "Descripción", key: "description" },
  { title: "Fecha", key: "eventDate" },
];

export const MIXES_REQ_COLUMNS: Column<PalletizingMix>[] = [
  { title: "Lote", key: "batch" },
  { title: "Cod mezcla", key: "mixCode" },
  { title: "KG", key: "formattedTotalKg" },
];

export const REQ_OBSERVATIONS_COLUMNS: Column<ObservationReq>[] = [
  {title: "Comentario", key: "comment"},
  {title: "Usuario", key: "userComment"},
  {title: "Fecha", key: "dateComment"},
];

export const REQ_STATUS_COLUMNS: Column<LogStatusReq>[] = [
  { title: "Usuario", key: "fullUserName" },
  { title: "Estado", key: "reqStatusName" },
  { title: "Descripción", key: "description" },
  { title: "Fecha", key: "eventDate" },
];

