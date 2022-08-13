import { atom } from "recoil";

export const nowPositionState = atom({
  key: "nowPosition",
  default: {
    address: {
      address_name: "",
      region_1depth_name: "",
      region_2depth_name: "",
      region_3depth_name: "",
    },
  },
});
