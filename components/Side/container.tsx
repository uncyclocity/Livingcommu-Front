import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nowPositionState } from "../../stores/NowPosition";
import SideSearch from "./search";
import { IoMdNavigate } from "react-icons/io";
import IconContainer from "../Icon/IconContainer";

type TSideContainer = { children?: React.ReactNode };

export default function SideContainer({ children }: TSideContainer) {
  const [nowPos] = useRecoilState(nowPositionState);

  return (
    <Container>
      <Header>
        <Image alt="icon" src="/icon.png" width="25px" height="25px" />
        <Logo>리빙커뮤</Logo>
      </Header>
      <SideSearch />
      <Outer>
        <NowPosArea>
          <IconContainer
            icon={<IoMdNavigate />}
            size={"15px"}
            color="#0fae76;"
          />
          <NowPosTopTitle>지금 이곳은?</NowPosTopTitle>
          <br />
          {nowPos &&
            `${nowPos.address.region_1depth_name} ${nowPos.address.region_2depth_name} ${nowPos.address.region_3depth_name}`}
        </NowPosArea>
        {children}
      </Outer>
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
  height: 220px;

  margin: 30px;

  display: block;
  border-radius: 15px;

  position: absolute;
  z-index: 1000;

  background: white;
  box-shadow: 2px 2px 10px #b8b8b8;
`;

const Outer = styled.div`
  padding: 5px 20px;
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
  font-size: 22px;

  color: white;
`;

const NowPosTopTitle = styled.span`
  font-size: 15px;
  color: #0fae76;
`;

const NowPosArea = styled.div`
  width: 100%;
  height: 70px;

  font-weight: bold;
  font-size: 20px;

  color: #2e2e2e;
`;
