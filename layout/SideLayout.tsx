import dynamic from "next/dynamic";
import React from "react";
import styled from "styled-components";
import SideAbsoluteOuter from "../components/Side/absoluteOuter";
import SideAddHouse from "../components/Side/addHouse";
import SideContainer from "../components/Side/container";
import SideLogoArea from "../components/Side/logoArea";
import SideNowPosition from "../components/Side/nowPosition";
import SideProfile from "../components/Side/profile";
import SideToolbar from "../components/Side/toolbar";

interface ISideLayout {
  children?: React.ReactNode;
  header?: React.ReactNode;
}

const SideSearchWithNoSSR = dynamic(
  () => import("../components/SearchBar/search"),
  {
    ssr: false,
  }
);

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
          <SideCtnArea>
            <SideContainer header={fixedCntHeader}>
              <SideNowPosition />
            </SideContainer>
            {children}
          </SideCtnArea>
          <Toolbar>
            <SideProfile />
            <SideToolbar />
            <SideAddHouse />
          </Toolbar>
        </Flex>
      </SideAbsoluteOuter>
    </>
  );
}

const SideCtnArea = styled.div`
  pointer-events: none;
`;

const Flex = styled.div`
  width: calc(100vw - 60px);

  display: flex;
  justify-content: space-between;

  pointer-events: none;
`;

const Toolbar = styled.div`
  pointer-events: none;

  & > * {
    pointer-events: initial;
  }

  & > div + * {
    margin: 10px 0;
  }

  & > div {
    margin-left: auto;
  }
`;
