export interface Palletized {
  hasPallet: boolean;
  mixQuantityKG: number;
  palletQuantity: number;
  palletTotalWeight: number;
}

export interface PalletizingMix {
  id: string;
  batch: number;
  mixCode: string;
  mixName: string;
  totalKg: number;
  formattedTotalKg: string;
};