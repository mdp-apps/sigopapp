import  { useEffect } from "react";

import { usePalletizedProduction } from "@/presentation/paletizado/hooks";
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
  const { palletizedProduction } = usePalletizedProduction(
    Number(req.internalCode)
  );

  useEffect(() => {
    if (palletizedProduction.length > 0) {
      handlePalletizedDataLoaded(palletizedProduction[0]);
    }
  }, [palletizedProduction]);

  return (
    <ReqCard req={req}>
      {children}
    </ReqCard>
  );
};

