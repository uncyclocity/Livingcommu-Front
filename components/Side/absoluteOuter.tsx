import React from "react";
import styled from "styled-components";

type TAbsoluteOuter = { children: React.ReactNode };

export default function SideAbsoluteOuter({ children }: TAbsoluteOuter) {
  return <Outer>{children}</Outer>;
}

const Outer = styled.div`
  margin: 30px 30px 15px 30px;

  position: absolute;

  z-index: 1000;

  pointer-events: none;
`;
