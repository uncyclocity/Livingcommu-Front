export interface INowPosAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export type TNowPosition = { address: INowPosAddress };
