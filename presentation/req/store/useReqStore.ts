import { Alert } from "react-native";

import { Req } from "@/infrastructure/entities";

import { create } from "zustand";

export interface ReqState {
  isVisibleModalTicket: boolean;
  ticketDataEncode: string;
  ticketDataToShow: string;

  hideModalExitTicket: () => void;
  showModalExitTicket: (req: Req) => void;
  showObservationModal: (observacion: string) => void;
}

export const useReqStore = create<ReqState>((set, get) => ({
  ticketDataEncode: "",
  ticketDataToShow: "",
  isVisibleModalTicket: false,

  hideModalExitTicket() {
    set({ isVisibleModalTicket: false });
  },

  showModalExitTicket(req: Req) {
    set({
      isVisibleModalTicket: true,
      ticketDataEncode: `{"patente":"${req.vehiclePatent}","requerimiento":"${req.internalCode}"}`,
      ticketDataToShow: `Requerimiento: ${req.internalCode}. Patente: ${req.vehiclePatent}. `,
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
}));