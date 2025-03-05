export interface Palletized{
  hasPallet: number;
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