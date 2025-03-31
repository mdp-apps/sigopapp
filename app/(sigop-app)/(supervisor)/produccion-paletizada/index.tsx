import { SearchReq } from "@/presentation/req/components";
import React from "react";

const ProduccionPalizadaScreen = () => {
  return (
    <SearchReq
      screenLink="/(sigop-app)/(supervisor)/configurar-pallets-req"
      searchByPatent
    />
  );
};

export default ProduccionPalizadaScreen;
