import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/NowPosition";
import SideSearch from "./search";

type TSideContainer = { children?: React.ReactNode };

export default function SideContainer({ children }: TSideContainer) {
  const [nowPos] = useRecoilState(nowPositionState);

  return (
    <Container>
      <Header>
        <Image alt="icon" src="/icon.png" width="30px" height="30px" />
        <Logo>리빙커뮤</Logo>
      </Header>
      <SideSearch />
      <div>
        {`${nowPos.address.region_1depth_name} ${nowPos.address.region_2depth_name} ${nowPos.address.region_3depth_name}`}
      </div>
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
  height: 300px;

  margin: 30px;

  display: block;
  border-radius: 15px;

  position: absolute;
  z-index: 1000;

  background: white;
  box-shadow: 2px 2px 10px #b8b8b8;
`;

const Header = styled.header`
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
  font-size: 25px;

  color: white;
`;
