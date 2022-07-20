import dynamic from "next/dynamic";
import React from "react";
import Map from "../components/Map";
import SideContainer from "../components/Side/container";
import SideLogoArea from "../components/Side/logoArea";
import SideNowPosition from "../components/Side/nowPosition";
import userList from "../dummy/userList.json";

type TSideLayout = { children?: React.ReactNode };

const SideSearchWithNoSSR = dynamic(() => import("../components/Side/search"), {
  ssr: false,
});

export default function SideLayout({ children }: TSideLayout) {
  const user = userList[0];

  const header = (
    <>
      <SideLogoArea />
      <SideSearchWithNoSSR />
    </>
  );

  return (
    <>
      <SideContainer header={header}>
        <SideNowPosition />
        {children}
      </SideContainer>
      <Map
        latitude={user.lastSite.latitude}
        longitude={user.lastSite.longitude}
      />
    </>
  );
}
