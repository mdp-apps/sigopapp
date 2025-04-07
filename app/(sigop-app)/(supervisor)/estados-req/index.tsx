import React from "react";

import { SearchReq } from "@/presentation/req/components";

const EstadosReqScreen = () => {
  return (
    <SearchReq
      screenLink="/(sigop-app)/(supervisor)/ver-estados-req"
      searchByPatent
    />
  );
};

export default EstadosReqScreen;
