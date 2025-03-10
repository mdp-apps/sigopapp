import { SectionListResponse } from "../interfaces";
import { LogStatusReq } from "../entities";

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
}