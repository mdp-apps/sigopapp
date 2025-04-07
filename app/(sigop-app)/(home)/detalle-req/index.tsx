import React from "react";

import { SearchReq } from "@/presentation/req/components";

const DetalleReqScreen = () => {
  return (
    <SearchReq
      screenLink="/(sigop-app)/(home)/ver-detalle-req"
      searchByPatent
    />
  );
};

export default DetalleReqScreen;
