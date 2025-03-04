import  React,{ useEffect } from "react";

import { usePalletizedProductionByCode } from "@/presentation/paletizado/hooks";
import { ReqCard } from "./ReqCard";

import { Palletized, Req } from "@/infrastructure/entities";

interface DriverReqPalletizedCardProps {
  children: React.ReactNode;
  req: Req;
  handlePalletizedDataLoaded: (data: Palletized) => void;
}

export const DriverReqPalletizedCard = ({
  children,
  req,
  handlePalletizedDataLoaded,
}: DriverReqPalletizedCardProps) => {
  const { queryPalletizedProduction } = usePalletizedProductionByCode(req.reqCode);
  console.log(
    JSON.stringify({ palletized: queryPalletizedProduction.data }, null, 2)
  );

  useEffect(() => {
    if (queryPalletizedProduction.isSuccess) {
      handlePalletizedDataLoaded(queryPalletizedProduction.data[0]);
    }
  }, [queryPalletizedProduction.isSuccess]);

  return (
    <ReqCard req={req}>
      {children}
    </ReqCard>
  );
};

