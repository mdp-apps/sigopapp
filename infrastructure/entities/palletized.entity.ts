export interface Palletized{
  hasPallet: number;
  mixQuantity: number;
  palletQuantity: number;
  totalWeight: number;
}

export interface  PalletizingMix {
  batch: number;
  mixCode: string;
  mixName: string;
  totalKg: number;
};