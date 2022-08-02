import React, { useEffect } from "react";
import userList from "../../dummy/userList.json";
import userDefaultSetList from "../../dummy/userDefaultSet.json";
import { userDefaultSetState } from "../../stores/UserDefaultSet";
import { userState } from "../../stores/User";
import { useRecoilState } from "recoil";
import Map from "../Map";

type TStore = { children: React.ReactElement };

export default function SemiRoot({ children }: TStore) {
  const [, setUser] = useRecoilState(userState);
  const [, setUserDefaultSet] = useRecoilState(userDefaultSetState);

  useEffect(() => {
    setUser(userList[0]);
    setUserDefaultSet(userDefaultSetList[0].userDefaultSet);
  }, [setUser, setUserDefaultSet]);

  return (
    <div>
      {children}
      <Map
        latitude={userDefaultSetList[0].userDefaultSet.lastSite.latitude}
        longitude={userDefaultSetList[0].userDefaultSet.lastSite.longitude}
      />
    </div>
  );
}
