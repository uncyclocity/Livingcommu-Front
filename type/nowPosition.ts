export interface INowPosAddress {
  address_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export type TNowPosition = { address: INowPosAddress };
