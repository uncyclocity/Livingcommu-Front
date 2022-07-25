import { atom } from "recoil";

export const userDefaultSetState = atom({
  key: "userDefaultSet",
  default: {
    addressType: "old",
    lastSite: {
      latitude: 0,
      longitude: 0,
    },
  },
});
