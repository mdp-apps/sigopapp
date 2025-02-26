import { Alert } from "react-native";

import { Req } from "@/infrastructure/entities";

import { create } from "zustand";

export interface ReqState {
  isVisibleModalTicket: boolean;
  ticketDataEncode: string;
  ticketDataToShow: string;

  isVisibleReqCards: boolean;
  searchRequirements: (
    filters: Record<string, string>,
  ) => void;
  showReqCards: () => void;
  hideReqCards: () => void;

  hideModalExitTicket: () => void;
  showModalExitTicket: (req: Req) => void;
  showObservationModal: (observacion: string) => void;
}

export const useReqStore = create<ReqState>((set,get) => ({
  isVisibleReqCards: false,
  isVisibleModalTicket: false,
  ticketDataEncode: "",
  ticketDataToShow: "",

  hideModalExitTicket() {
    set({ isVisibleModalTicket: false });
  },
  hideReqCards() {
    set({ isVisibleReqCards: false });
  },
  async searchRequirements(filters: Record<string,string>) {
    const areThereFilters = Object.values(filters).every(
      (filter) => filter === ""
    );

    if (areThereFilters) {
      Alert.alert("Atención", "Debe seleccionar algún filtro.");
      return;
    }


    get().showReqCards();
  },
  showModalExitTicket(req: Req) {
    const dataToEncode = `{"patente":"${req.vehiclePatent}","requerimiento":"${req.internalCode}"}`;
    const dataToShow = `Requerimiento: ${req.internalCode}. Patente: ${req.vehiclePatent}.`;

    set({
      isVisibleModalTicket: true,
      ticketDataEncode: dataToEncode,
      ticketDataToShow: dataToShow,
    });
  },
  showObservationModal: (observacion: string) => {
    Alert.alert("Observación", observacion, [
      {
        text: "Aceptar",
        onPress: () => console.log("Cerrar observación"),
        style: "cancel",
      },
    ]);
  },
  showReqCards() {
    set({ isVisibleReqCards: true });
  },
}));