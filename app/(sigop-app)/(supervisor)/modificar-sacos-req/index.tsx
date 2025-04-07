import React from "react";

import { SearchReq } from "@/presentation/req/components";

const ModifcarSacosReqScreen = () => {
  return (
    <SearchReq
      screenLink="/(sigop-app)/(supervisor)/modificar-sacos"
      searchByPatent
    />
  );
};

export default ModifcarSacosReqScreen;
