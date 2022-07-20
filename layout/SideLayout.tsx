import dynamic from "next/dynamic";
import React from "react";
import SideContainer from "../components/Side/container";
import SideLogoArea from "../components/Side/logoArea";
import SideNowPosition from "../components/Side/nowPosition";

type TSideLayout = { children: React.ReactNode };

const SideSearchWithNoSSR = dynamic(() => import("../components/Side/search"), {
  ssr: false,
});

export default function SideLayout({ children }: TSideLayout) {
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
      </SideContainer>
      {children}
    </>
  );
}
