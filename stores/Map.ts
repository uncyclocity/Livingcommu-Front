import { atom } from 'recoil';

export const nowPositionState = atom({
  key: 'nowPosition',
  default: {
    address: {
      address_name: '',
      mountain_yn: '',
      main_address_no: '',
      sub_address_no: '',
      region_1depth_name: '',
      region_2depth_name: '',
      region_3depth_name: '',
    },
    road_address: {
      address_name: '',
      building_name: '',
      main_building_no: '',
      region_1depth_name: '',
      region_2depth_name: '',
      region_3depth_name: '',
      road_name: '',
      sub_building_no: '',
      underground_yn: '',
      zone_no: '',
    },
  },
});
