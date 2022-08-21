export interface INowPosAddress {
  address_name: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
}

export interface INowPosRoadAddress {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  sub_building_no: string;
  underground_yn: string;
  zone_no: string;
}

export type TNowPosition = {
  address: INowPosAddress;
  road_address: INowPosRoadAddress;
};
