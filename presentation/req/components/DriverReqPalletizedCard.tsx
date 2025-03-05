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

