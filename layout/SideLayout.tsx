import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import Map from "../components/Map";
import SideAbsoluteOuter from "../components/Side/absoluteOuter";
import SideContainer from "../components/Side/container";
import SideLogoArea from "../components/Side/logoArea";
import SideNowPosition from "../components/Side/nowPosition";
import SideProfile from "../components/Side/profile";
import SideToolbar from "../components/Side/toolbar";

interface ISideLayout {
  children?: React.ReactNode;
  header?: React.ReactNode;
}

const SideSearchWithNoSSR = dynamic(() => import("../components/Side/search"), {
  ssr: false,
});

export default function SideLayout({ children, header }: ISideLayout) {
  const fixedCntHeader = (
    <>
      <SideLogoArea />
      <SideSearchWithNoSSR />
    </>
  );

  return (
    <>
      <SideAbsoluteOuter>
        <Flex>
          <div>
            <SideContainer header={fixedCntHeader}>
              <SideNowPosition />
            </SideContainer>
            {children}
          </div>
          <Toolbar>
            <SideProfile />
            <SideToolbar />
          </Toolbar>
        </Flex>
      </SideAbsoluteOuter>
    </>
  );
}

const Flex = styled.div`
  width: calc(100vw - 60px);
  display: flex;
  justify-content: space-between;
`;

const Toolbar = styled.div`
  & > div + * {
    margin: 10px 0;
  }
`;
