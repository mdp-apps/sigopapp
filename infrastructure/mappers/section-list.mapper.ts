import { SectionListResponse } from "../interfaces";
import { LogStatusReq, ObservationReq } from "../entities";

export class SectionListMapper {
  static fromReqStatusToSectionList = (
    reqStatus: LogStatusReq
  ): SectionListResponse[] => {
    return [
      {
        title: "Usuario",
        data: [reqStatus?.fullUserName ?? ""],
      },
      {
        title: "Estado",
        data: [reqStatus?.reqStatusName ?? ""],
      },
      {
        title: "Descripción",
        data: [reqStatus?.description ?? ""],
      },
      {
        title: "Fecha y hora",
        data: [reqStatus?.eventDate ?? ""],
      }
    ];
  };

  static fromObservationToSectionList = (
    observation: ObservationReq
  ): SectionListResponse[] => {
    return [
      {
        title: "Comentario",
        data: [observation?.comment ?? ""],
      },
      {
        title: "Usuario",
        data: [observation?.userComment ?? ""],
      },
      {
        title: "Fecha y hora",
        data: [observation?.dateComment ?? ""],
      }
    ];
  };
}