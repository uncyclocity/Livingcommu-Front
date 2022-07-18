import { atom } from "recoil";

export const nowPositionState = atom({
  key: "nowPosition",
  default: {
    address: {
      region_1depth_name: "",
      region_2depth_name: "",
      region_3depth_name: "",
    },
  },
});
