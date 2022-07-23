export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export interface IAddressOld {
  full: string;
  province: string;
  sigungu: string;
  eupMyeonDong: string;
  number: string;
}

export interface IAddressLoad {
  full: string;
  province: string;
  sigungu: string;
  loadNumber: string;
}

export interface IHouseList {
  id: number;
  createdAt: Date;
  type: string;
  name: string;
  coordinate: ICoordinate;
  address_old: IAddressOld;
  address_load: IAddressLoad;
}
