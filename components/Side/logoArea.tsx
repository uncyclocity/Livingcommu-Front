import Image from "next/image";
import styled from "styled-components";

export default function SideLogoArea() {
  return (
    <Container>
      <Image alt="icon" src="/icon.png" width="25px" height="25px" />
      <Logo>리빙커뮤</Logo>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 60px;

  padding: 0 20px;

  border-radius: 15px 15px 0 0;

  display: flex;
  align-items: center;

  background: #0fae76;
`;

const Logo = styled.div`
  margin: 10px 10px 0 10px;

  font-family: SBAggro;
  font-weight: 500;
  font-size: 22px;

  color: white;
`;
