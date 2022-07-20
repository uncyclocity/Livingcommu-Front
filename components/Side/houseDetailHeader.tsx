import styled from "styled-components";

type THouseDetailHeader = { title: string };

export default function SideHouseDetailHeader({ title }: THouseDetailHeader) {
  return <Container>{title}</Container>;
}

const Container = styled.header`
  width: 100%;
  height: 60px;

  padding: 0 20px;

  display: flex;
  align-items: center;
`;
