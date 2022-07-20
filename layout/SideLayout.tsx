import dynamic from "next/dynamic";
import React from "react";
import Map from "../components/Map";
import SideAbsoluteOuter from "../components/Side/absoluteOuter";
import SideContainer from "../components/Side/container";
import SideLogoArea from "../components/Side/logoArea";
import SideNowPosition from "../components/Side/nowPosition";
import userList from "../dummy/userList.json";

interface ISideLayout {
  children?: React.ReactNode;
  header?: React.ReactNode;
}

const SideSearchWithNoSSR = dynamic(() => import("../components/Side/search"), {
  ssr: false,
});

export default function SideLayout({ children, header }: ISideLayout) {
  const user = userList[0];

  const fixedCntHeader = (
    <>
      <SideLogoArea />
      <SideSearchWithNoSSR />
    </>
  );

  return (
    <>
      <SideAbsoluteOuter>
        <SideContainer header={fixedCntHeader}>
          <SideNowPosition />
        </SideContainer>
        {children && <SideContainer header={header}>{children}</SideContainer>}
      </SideAbsoluteOuter>
      <Map
        latitude={user.lastSite.latitude}
        longitude={user.lastSite.longitude}
      />
    </>
  );
}
